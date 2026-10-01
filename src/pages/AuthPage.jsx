import { useState } from "react"
import { GetMe, Login, Register } from "../services/server"
import Icon from "../components/Icon"
import ThemeToggle from "../components/ThemeToggle"

function AuthPage({ mode, onModeChange, onBack, onAuthenticated, theme, onThemeToggle }) {
  const isSignup = mode === "signup"
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({ name: "", email: "", password: "" })
  const [status, setStatus] = useState({ loading: false, error: "", success: false })

  const updateField = (event) => setForm({ ...form, [event.target.name]: event.target.value })

  const submit = async (event) => {
    event.preventDefault()
    setStatus({ loading: true, error: "", success: false })
    try {
      if (isSignup) await Register(form.name, form.email, form.password)
      const loginResponse = await Login(form.email, form.password)
      const token = loginResponse.access_token
      const user = loginResponse.user || await GetMe(token)
      onAuthenticated({ token, user })
    } catch (error) {
      setStatus({ loading: false, error: error.message || "Something went wrong.", success: false })
    }
  }

  return <main className="auth-page"><div className="auth-glow auth-glow-one" /><div className="auth-glow auth-glow-two" /><nav className="nav auth-nav"><button className="brand brand-button" type="button" onClick={onBack}><span className="brand-mark"><Icon name="shield" /></span><span>Cipher</span></button><div className="nav-actions"><ThemeToggle theme={theme} onToggle={onThemeToggle} /><button className="back-link" type="button" onClick={onBack}>Back to checker <Icon name="chevron" size={15} /></button></div></nav><div className="auth-layout"><section className="auth-intro"><div className="eyebrow"><Icon name="shield" size={15} /> Protected by design</div><h1>{isSignup ? "Your security starts here." : "Welcome back."}</h1><p>{isSignup ? "Create your private workspace and take control of your password security." : "Sign in to continue protecting your digital identity."}</p><div className="trust-list"><Trust icon="lock" title="Privacy first">Your sensitive data stays encrypted.</Trust><Trust icon="sparkle" title="Built for clarity">Simple insights, actionable security.</Trust><Trust icon="shield" title="Secure by default">Industry-standard account protection.</Trust></div></section><section className="auth-card glass">{status.success ? <div className="auth-success"><span><Icon name="check" size={28} /></span><h2>{isSignup ? "Account created" : "You're signed in"}</h2><p>{isSignup ? "Your secure Cipher workspace is ready." : "Welcome back to your security dashboard."}</p><button className="button primary" type="button" onClick={onBack}>Open password checker <Icon name="arrow" /></button></div> : <><div className="auth-card-head"><span className="auth-icon"><Icon name={isSignup ? "user" : "lock"} size={21} /></span><h2>{isSignup ? "Create your account" : "Sign in to Cipher"}</h2><p>{isSignup ? "Start securing your digital life in seconds." : "Enter your details to access your account."}</p></div><div className="auth-tabs"><button className={!isSignup ? "active" : ""} type="button" onClick={() => onModeChange("login")}>Sign in</button><button className={isSignup ? "active" : ""} type="button" onClick={() => onModeChange("signup")}>Create account</button></div><form className="auth-form" onSubmit={submit}>{isSignup && <label><span>Full name</span><div className="auth-input"><Icon name="user" /><input name="name" type="text" value={form.name} onChange={updateField} placeholder="Jane Smith" autoComplete="name" required /></div></label>}<label><span>Email address</span><div className="auth-input"><Icon name="mail" /><input name="email" type="email" value={form.email} onChange={updateField} placeholder="you@example.com" autoComplete="email" required /></div></label><label><span className="label-row"><span>Password</span>{!isSignup && <button type="button">Forgot password?</button>}</span><div className="auth-input"><Icon name="lock" /><input name="password" type={showPassword ? "text" : "password"} value={form.password} onChange={updateField} placeholder={isSignup ? "At least 12 characters" : "Enter your password"} minLength={isSignup ? 12 : 1} autoComplete={isSignup ? "new-password" : "current-password"} required /><button className="auth-eye" type="button" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? "Hide password" : "Show password"}><Icon name={showPassword ? "eyeOff" : "eye"} /></button></div></label>{isSignup && <label className="terms"><input type="checkbox" required /><span>I agree to the <a href="#terms">Terms of Service</a> and <a href="#privacy">Privacy Policy</a>.</span></label>}{status.error && <p className="auth-error" role="alert">{status.error}</p>}<button className="button primary auth-submit" type="submit" disabled={status.loading}>{status.loading ? "Please wait..." : isSignup ? "Create secure account" : "Sign in securely"} {!status.loading && <Icon name="arrow" />}</button></form><p className="auth-switch">{isSignup ? "Already have an account?" : "New to Cipher?"} <button type="button" onClick={() => onModeChange(isSignup ? "login" : "signup")}>{isSignup ? "Sign in" : "Create an account"}</button></p></>}</section></div></main>
}

function Trust({ icon, title, children }) {
  return <div><span><Icon name={icon} /></span><p><strong>{title}</strong>{children}</p></div>
}

export default AuthPage
