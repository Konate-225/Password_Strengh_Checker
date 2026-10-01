const commonPasswords = ["password", "password123", "123456", "qwerty", "letmein", "admin", "welcome"]

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
  const crackTime = entropy < 28 ? "Instantly" : entropy < 40 ? "A few minutes" : entropy < 60 ? "About 3 years" : entropy < 80 ? "Centuries" : "Millions of years"

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
