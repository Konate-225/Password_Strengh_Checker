import { useMemo, useState } from "react"
import AppHeader from "../components/AppHeader"
import CopyButton from "../components/CopyButton"
import Icon from "../components/Icon"
import { analyzePassword, makePassword } from "../utils/password"

const initialGenerator = { length: 18, uppercase: true, lowercase: true, numbers: true, symbols: true, excludeSimilar: false, excludeAmbiguous: false }

function CheckerPage({ theme, onThemeToggle, onLogin, onSignup, user, onLogout }) {
  const [password, setPassword] = useState("")
  const [analyzedPassword, setAnalyzedPassword] = useState("")
  const [hasAnalyzed, setHasAnalyzed] = useState(false)
  const [visible, setVisible] = useState(false)
  const [generator, setGenerator] = useState(initialGenerator)
  const [generated, setGenerated] = useState("K7!vQ2#nX9@mR4$zLp")
  const [openTip, setOpenTip] = useState(null)
  const analysis = useMemo(() => analyzePassword(analyzedPassword), [analyzedPassword])

  const generate = (useMain = false) => {
    const next = makePassword(generator)
    setGenerated(next)
    if (useMain) {
      setPassword(next)
      if (hasAnalyzed) setAnalyzedPassword(next)
    }
  }

  return (
    <main>
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <AppHeader theme={theme} onThemeToggle={onThemeToggle} onLogin={onLogin} onSignup={onSignup} user={user} onLogout={onLogout} />

      <section className="hero">
        <div className="eyebrow"><Icon name="shield" size={15} /> Password security, simplified</div>
        <h1>Check Your Password <span>Strength</span></h1>
        <p>Instantly analyze your password security and estimate how resistant it is against modern attacks.</p>
        <div className="checker">
          <div className="input-label"><span>Password</span></div>
          <div className="password-row">
            <div className="password-field">
              <input aria-label="Password to analyze" type={visible ? "text" : "password"} value={password} onChange={(event) => { const nextPassword = event.target.value; setPassword(nextPassword); if (hasAnalyzed) setAnalyzedPassword(nextPassword) }} placeholder="Enter a password to analyze..." />
              <button className="field-action eye-button" type="button" onClick={() => setVisible(!visible)} aria-label={visible ? "Hide password" : "Show password"}><Icon name={visible ? "eyeOff" : "eye"} /></button>
              <div className="field-copy"><CopyButton value={password} compact /></div>
            </div>
            <button className="button secondary generate-top" type="button" onClick={() => generate(true)}><Icon name="sparkle" /><span>Generate</span></button>
            <button className="button primary" type="button" onClick={() => { setAnalyzedPassword(password); setHasAnalyzed(true) }}><span>Analyze</span><Icon name="arrow" /></button>
          </div>
        </div>
      </section>

      <div className="content">
        <section className="glass analysis-card">
          <div className="section-heading"><div><span className="section-kicker">PASSWORD ANALYSIS</span><h2>Your security overview</h2></div><div className={`strength-badge ${analysis.level.toLowerCase()}`}><span />{analysis.level}</div></div>
          <div className="progress-meta"><span>Security strength</span><strong>{analysis.score}<small>/100</small></strong></div>
          <div className="progress-track"><div className={`progress-fill ${analysis.level.toLowerCase()}`} style={{ width: `${analysis.score}%` }} /></div>
          <div className="metrics">
            <Metric icon="clock" label="EST. CRACK TIME" title="Estimate assumes an offline attack at 10 billion guesses per second. Actual time depends on the hashing method and attacker."><strong>{analysis.crackTime}</strong></Metric>
            <Metric icon="chart" label="ENTROPY"><strong>{analysis.entropy} <small>bits</small></strong></Metric>
            <Metric icon="hash" label="LENGTH"><strong>{analyzedPassword.length} <small>characters</small></strong></Metric>
            <Metric icon="layers" label="CHARACTER TYPES"><p>{analysis.types.length ? analysis.types.map((type) => <b key={type}>{type}</b>) : <small>None detected</small>}</p></Metric>
          </div>
        </section>

        <section className="two-column">
          <div className="glass checklist-card"><div className="section-heading compact"><div><span className="section-kicker">SECURITY CHECKLIST</span><h2>Protection essentials</h2></div><span className="count-badge">{analysis.checks.filter((check) => check[2]).length}/7</span></div><div className="checklist">{analysis.checks.map(([id, label, ok]) => <div className={`check-item ${ok ? "passed" : ""}`} key={id}><span className="check-status">{ok ? "✓" : "×"}</span><span>{label}</span><small>{ok ? "Passed" : "Missing"}</small></div>)}</div></div>
          <Suggestions analysis={analysis} password={analyzedPassword} />
        </section>

        <GeneratorPanel generator={generator} setGenerator={setGenerator} generated={generated} onGenerate={() => generate(false)} />
        <SecurityTips openTip={openTip} setOpenTip={setOpenTip} />
      </div>
    </main>
  )
}

function Metric({ icon, label, title, children }) {
  return <div className="metric" title={title}><span className="metric-icon violet"><Icon name={icon} /></span><div><span>{label}</span>{children}</div></div>
}

function Suggestions({ analysis, password }) {
  const suggestions = [["sparkle", "Add special characters", "Symbols dramatically expand the possible combinations.", analysis.checks[3][2]], ["hash", "Increase password length", "Aim for 16+ characters for stronger protection.", password.length >= 16], ["bulb", "Avoid dictionary words", "Random phrases resist automated guessing attacks.", analysis.checks[6][2]], ["layers", "Mix letter cases", "Combine uppercase and lowercase throughout.", analysis.checks[0][2] && analysis.checks[1][2]]]
  return <div className="suggestions-wrap"><div className="section-heading compact outside"><div><span className="section-kicker">SMART SUGGESTIONS</span><h2>Make it even stronger</h2></div></div><div className="suggestions-grid">{suggestions.map(([icon, title, text, done]) => <article className={`suggestion ${done ? "done" : ""}`} key={title}><span className="suggestion-icon"><Icon name={done ? "check" : icon} /></span><div><h3>{title}</h3><p>{done ? "Your password meets this recommendation." : text}</p></div></article>)}</div></div>
}

function GeneratorPanel({ generator, setGenerator, generated, onGenerate }) {
  const options = [["uppercase", "Uppercase", "ABC"], ["lowercase", "Lowercase", "abc"], ["numbers", "Numbers", "123"], ["symbols", "Symbols", "#$&"], ["excludeSimilar", "Exclude similar", "Il1"], ["excludeAmbiguous", "Exclude ambiguous", "{}[]"]]
  return <section className="glass generator-card"><div className="generator-head"><div className="section-heading compact"><span className="large-icon"><Icon name="sparkle" size={22} /></span><div><span className="section-kicker">PASSWORD GENERATOR</span><h2>Create an unbreakable password</h2></div></div><span className="secure-tag"><Icon name="shield" size={14} /> Cryptographically secure</span></div><div className="generated-row"><div className="generated-password">{generated}</div><CopyButton value={generated} /></div><div className="generator-controls"><div className="length-control"><label htmlFor="length"><span>Password length</span><strong>{generator.length}</strong></label><input id="length" type="range" min="8" max="32" value={generator.length} onChange={(event) => setGenerator({ ...generator, length: Number(event.target.value) })} style={{ "--range": `${((generator.length - 8) / 24) * 100}%` }} /><div className="range-labels"><span>8</span><span>20</span><span>32</span></div></div><div className="toggles">{options.map(([key, label, example]) => <label className="toggle-row" key={key}><span><b>{label}</b><small>{example}</small></span><input type="checkbox" checked={generator[key]} onChange={() => setGenerator({ ...generator, [key]: !generator[key] })} /><i /></label>)}</div></div><button className="button primary generator-button" type="button" onClick={onGenerate}><Icon name="sparkle" /><span>Generate new password</span></button></section>
}

function SecurityTips({ openTip, setOpenTip }) {
  const tips = [["key", "Use unique passwords", "Never reuse passwords across accounts. One breach should never unlock everything.", "A unique password isolates every account. If one service is compromised, attackers cannot reuse those credentials to access your email, banking or social profiles."], ["userCheck", "Enable two-factor authentication", "Add a second layer of protection to your most important accounts.", "Prefer an authenticator app or a physical security key when available. They provide stronger protection than verification codes received by SMS."], ["vault", "Use a password manager", "Securely generate, store and autofill strong passwords everywhere.", "A trusted password manager lets you use long, random passwords without memorizing them. Protect the vault with one strong master password and two-factor authentication."]]
  return <section className="tips"><div className="tips-heading"><span className="section-kicker">SECURITY BEST PRACTICES</span><h2>Stay one step ahead</h2><p>Small habits make a big difference in keeping your digital life secure.</p></div><div className="tip-grid">{tips.map(([icon, title, text, details], index) => { const isOpen = openTip === index; return <article className={`tip-card ${isOpen ? "expanded" : ""}`} key={title}><span className="tip-number">0{index + 1}</span><span className="tip-icon"><Icon name={icon} size={23} /></span><h3>{title}</h3><p>{text}</p><div className="accordion-content" aria-hidden={!isOpen}><div><p>{details}</p></div></div><button className="learn" type="button" aria-expanded={isOpen} onClick={() => setOpenTip(isOpen ? null : index)}><span>{isOpen ? "Show less" : "Learn more"}</span><span className="accordion-arrow"><Icon name="arrow" size={16} /></span></button></article> })}</div></section>
}

export default CheckerPage
