import zxcvbn from "zxcvbn"

const commonPasswords = ["password", "password123", "123456", "qwerty", "letmein", "admin", "welcome"]
const guessesPerSecond = 10_000_000_000
const onlineGuessesPerHour = 100
const secondsPerYear = 365.25 * 24 * 60 * 60

function formatCrackTime(seconds) {
  if (!Number.isFinite(seconds)) return "Over 10^300 years"
  if (seconds < 1) return "Less than a second"

  const units = [
    [secondsPerYear, "year"],
    [24 * 60 * 60, "day"],
    [60 * 60, "hour"],
    [60, "minute"],
    [1, "second"],
  ]
  const [unitSeconds, unitName] = units.find(([duration]) => seconds >= duration)
  const amount = Math.ceil(seconds / unitSeconds)
  if (unitName === "year") {
    const longDurations = [
      [1e18, "Quintillions of years"],
      [1e15, "Quadrillions of years"],
      [1e12, "Trillions of years"],
      [1e9, "Billions of years"],
      [1e6, "Millions of years"],
    ]
    const longDuration = longDurations.find(([size]) => amount >= size)
    if (longDuration) return longDuration[1]

    if (amount >= 1_000) {
      const millennia = Math.round((amount / 1_000) * 10) / 10
      return `${millennia.toLocaleString("en")} millennia`
    }
    if (amount >= 100) {
      const centuries = Math.round((amount / 100) * 10) / 10
      return `${centuries.toLocaleString("en")} ${centuries === 1 ? "century" : "centuries"}`
    }
  }
  const formattedAmount = amount.toLocaleString("en")

  return `${formattedAmount} ${unitName}${amount === 1 ? "" : "s"}`
}

export function analyzePassword(password) {
  const upper = /[A-Z]/.test(password)
  const lower = /[a-z]/.test(password)
  const number = /\d/.test(password)
  const symbol = /[^A-Za-z0-9]/.test(password)
  const noRepeat = !/(.)\1{2,}|(.{2,})\2/i.test(password)
  const notCommon = password.length > 0 && !commonPasswords.includes(password.toLowerCase())
  const checks = [
    ["uppercase", "Uppercase letters", upper],
    ["lowercase", "Lowercase letters", lower],
    ["numbers", "Numbers", number],
    ["symbols", "Symbols", symbol],
    ["length", "Minimum 12 characters", password.length >= 12],
    ["repeat", "No repeated sequences", password.length > 0 && noRepeat],
    ["common", "No common password", notCommon],
  ]
  const pool = (upper ? 26 : 0) + (lower ? 26 : 0) + (number ? 10 : 0) + (symbol ? 32 : 0)
  const entropy = password ? Math.round(password.length * Math.log2(Math.max(pool, 1))) : 0
  let score = Math.min(100, Math.round((entropy / 85) * 72 + checks.filter((check) => check[2]).length * 4))
  if (!notCommon || !noRepeat) score = Math.min(score, 32)
  if (!password) score = 0
  const level = score >= 80 ? "Strong" : score >= 60 ? "Good" : score >= 35 ? "Fair" : "Weak"
  const estimate = password ? zxcvbn(password) : null
  const bruteForceOnly = estimate?.sequence.every((match) => match.pattern === "bruteforce")
  const guesses = estimate
    ? bruteForceOnly ? Math.max(estimate.guesses, pool ** password.length) : estimate.guesses
    : 0
  const crackTime = password
    ? {
        online: formatCrackTime(guesses / (onlineGuessesPerHour / 60 / 60)),
        offline: formatCrackTime(guesses / guessesPerSecond),
      }
    : { online: "—", offline: "—" }

  return { checks, entropy, score, level, crackTime, types: [upper && "A–Z", lower && "a–z", number && "0–9", symbol && "#!$"].filter(Boolean) }
}

export function makePassword(options) {
  let chars = ""
  if (options.uppercase) chars += "ABCDEFGHJKLMNPQRSTUVWXYZ"
  if (options.lowercase) chars += "abcdefghijkmnopqrstuvwxyz"
  if (options.numbers) chars += "23456789"
  if (options.symbols) chars += "!@#$%^&*+-=?"
  if (!options.excludeSimilar) chars += "Il1O0o"
  if (!options.excludeAmbiguous) chars += "{}[]()/\\'\"`~,;:.<>"
  if (!chars) chars = "abcdefghijkmnopqrstuvwxyz"

  const values = new Uint32Array(options.length)
  window.crypto.getRandomValues(values)
  return Array.from(values, (value) => chars[value % chars.length]).join("")
}
