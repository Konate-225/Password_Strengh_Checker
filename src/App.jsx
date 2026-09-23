import { useEffect, useMemo, useState } from "react";
import "./styles/App.css";

const commonPasswords = [
  "password",
  "password123",
  "123456",
  "qwerty",
  "letmein",
  "admin",
  "welcome",
];

function Icon({ name, size = 18 }) {
  const paths = {
    shield: (
      <>
        <path d="M12 3 5 6v5c0 4.4 2.8 8.2 7 10 4.2-1.8 7-5.6 7-10V6l-7-3Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
    eye: (
      <>
        <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
        <circle cx="12" cy="12" r="2.5" />
      </>
    ),
    eyeOff: (
      <>
        <path d="m3 3 18 18" />
        <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8M9.9 5.2A9.6 9.6 0 0 1 12 5c6 0 9.5 7 9.5 7a14.7 14.7 0 0 1-2 2.8M6.6 6.6C4 8.3 2.5 12 2.5 12s3.5 7 9.5 7c1.2 0 2.3-.3 3.3-.7" />
      </>
    ),
    copy: (
      <>
        <rect x="8" y="8" width="11" height="11" rx="2" />
        <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
      </>
    ),
    sparkle: (
      <>
        <path d="m12 3 1.2 3.8L17 8l-3.8 1.2L12 13l-1.2-3.8L7 8l3.8-1.2L12 3Z" />
        <path d="m18.5 14 .7 2.3 2.3.7-2.3.7-.7 2.3-.7-2.3-2.3-.7 2.3-.7.7-2.3Z" />
        <path d="m5 13 .7 2.3L8 16l-2.3.7L5 19l-.7-2.3L2 16l2.3-.7L5 13Z" />
      </>
    ),
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m14 7 5 5-5 5" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    chart: (
      <>
        <path d="M4 19V9" />
        <path d="M10 19V5" />
        <path d="M16 19v-7" />
        <path d="M22 19V3" />
      </>
    ),
    hash: (
      <>
        <path d="M5 9h14M4 15h14M10 3 8 21M16 3l-2 18" />
      </>
    ),
    layers: (
      <>
        <path d="m12 3-9 5 9 5 9-5-9-5Z" />
        <path d="m3 12 9 5 9-5" />
        <path d="m3 16 9 5 9-5" />
      </>
    ),
    bulb: (
      <>
        <path d="M9 18h6" />
        <path d="M10 22h4" />
        <path d="M8.2 14.2A7 7 0 1 1 15.8 14c-1.1.8-1.3 1.8-1.3 2H9.5c0-.2-.2-1.1-1.3-1.8Z" />
      </>
    ),
    key: (
      <>
        <circle cx="8" cy="15" r="4" />
        <path d="m11 12 8-8M15 8l2 2M17 6l2 2" />
      </>
    ),
    userCheck: (
      <>
        <circle cx="9" cy="8" r="4" />
        <path d="M2 21a7 7 0 0 1 14 0" />
        <path d="m16 14 2 2 4-4" />
      </>
    ),
    vault: (
      <>
        <rect x="3" y="4" width="18" height="16" rx="3" />
        <circle cx="12" cy="12" r="3" />
        <path d="M12 9V7M12 17v-2M9 12H7M17 12h-2" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="3" />
        <path d="m4 7 8 6 8-6" />
      </>
    ),
    lock: (
      <>
        <rect x="4" y="10" width="16" height="11" rx="3" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
        <path d="M12 14v3" />
      </>
    ),
    user: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21a8 8 0 0 1 16 0" />
      </>
    ),
    chevron: <path d="m9 18 6-6-6-6" />,
    sun: (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41" />
      </>
    ),
    moon: (
      <>
        <path d="M21 12.8A8.5 8.5 0 1 1 11.2 3 6.6 6.6 0 0 0 21 12.8Z" />
      </>
    ),
  };
  return (
    <svg
      className="icon"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === "dark";
  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={onToggle}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      title={`Switch to ${isDark ? "light" : "dark"} theme`}
    >
      <Icon name={isDark ? "sun" : "moon"} />
      <span>{isDark ? "Light" : "Dark"}</span>
    </button>
  );
}

function analyzePassword(password) {
  const upper = /[A-Z]/.test(password);
  const lower = /[a-z]/.test(password);
  const number = /\d/.test(password);
  const symbol = /[^A-Za-z0-9]/.test(password);
  const noRepeat = !/(.)\1{2,}|(.{2,})\2/i.test(password);
  const notCommon =
    password.length > 0 && !commonPasswords.includes(password.toLowerCase());
  const checks = [
    ["uppercase", "Uppercase letters", upper],
    ["lowercase", "Lowercase letters", lower],
    ["numbers", "Numbers", number],
    ["symbols", "Symbols", symbol],
    ["length", "Minimum 12 characters", password.length >= 12],
    ["repeat", "No repeated sequences", password.length > 0 && noRepeat],
    ["common", "No common password", notCommon],
  ];
  const pool =
    (upper ? 26 : 0) + (lower ? 26 : 0) + (number ? 10 : 0) + (symbol ? 32 : 0);
  const entropy = password
    ? Math.round(password.length * Math.log2(Math.max(pool, 1)))
    : 0;
  let score = Math.min(
    100,
    Math.round((entropy / 85) * 72 + checks.filter((c) => c[2]).length * 4),
  );
  if (!notCommon || !noRepeat) score = Math.min(score, 32);
  if (!password) score = 0;
  const level =
    score >= 80
      ? "Strong"
      : score >= 60
        ? "Good"
        : score >= 35
          ? "Fair"
          : "Weak";
  const crackTime =
    entropy < 28
      ? "Instantly"
      : entropy < 40
        ? "A few minutes"
        : entropy < 60
          ? "About 3 years"
          : entropy < 80
            ? "Centuries"
            : "Millions of years";
  return {
    checks,
    entropy,
    score,
    level,
    crackTime,
    types: [
      upper && "A–Z",
      lower && "a–z",
      number && "0–9",
      symbol && "#!$",
    ].filter(Boolean),
  };
}

function makePassword(options) {
  let chars = "";
  if (options.uppercase) chars += "ABCDEFGHJKLMNPQRSTUVWXYZ";
  if (options.lowercase) chars += "abcdefghijkmnopqrstuvwxyz";
  if (options.numbers) chars += "23456789";
  if (options.symbols) chars += "!@#$%^&*+-=?";
  if (!options.excludeSimilar) chars += "Il1O0o";
  if (!options.excludeAmbiguous) chars += "{}[]()/\\'\"`~,;:.<>";
  if (!chars) chars = "abcdefghijkmnopqrstuvwxyz";
  const cryptoObj = window.crypto;
  const values = new Uint32Array(options.length);
  cryptoObj.getRandomValues(values);
  return Array.from(values, (value) => chars[value % chars.length]).join("");
}

function CopyButton({ value, compact = false }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    if (!value) return;
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <button
      className={compact ? "icon-button" : "button secondary"}
      onClick={copy}
      type="button"
      aria-label="Copy password"
    >
      <Icon name={copied ? "check" : "copy"} />
      {!compact && <span>{copied ? "Copied" : "Copy"}</span>}
    </button>
  );
}

function AuthPage({ mode, onModeChange, onBack, theme, onThemeToggle }) {
  const isSignup = mode === "signup";
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const submit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="auth-page">
      <div className="auth-glow auth-glow-one" />
      <div className="auth-glow auth-glow-two" />
      <nav className="nav auth-nav">
        <button className="brand brand-button" type="button" onClick={onBack}>
          <span className="brand-mark">
            <Icon name="shield" />
          </span>
          <span>Cipher</span>
        </button>
        <div className="nav-actions">
          <ThemeToggle theme={theme} onToggle={onThemeToggle} />
          <button className="back-link" type="button" onClick={onBack}>
            Back to checker <Icon name="chevron" size={15} />
          </button>
        </div>
      </nav>
      <div className="auth-layout">
        <section className="auth-intro">
          <div className="eyebrow">
            <Icon name="shield" size={15} /> Protected by design
          </div>
          <h1>{isSignup ? "Your security starts here." : "Welcome back."}</h1>
          <p>
            {isSignup
              ? "Create your private workspace and take control of your password security."
              : "Sign in to continue protecting your digital identity."}
          </p>
          <div className="trust-list">
            <div>
              <span>
                <Icon name="lock" />
              </span>
              <p>
                <strong>Privacy first</strong>Your sensitive data stays
                encrypted.
              </p>
            </div>
            <div>
              <span>
                <Icon name="sparkle" />
              </span>
              <p>
                <strong>Built for clarity</strong>Simple insights, actionable
                security.
              </p>
            </div>
            <div>
              <span>
                <Icon name="shield" />
              </span>
              <p>
                <strong>Secure by default</strong>Industry-standard account
                protection.
              </p>
            </div>
          </div>
        </section>
        <section className="auth-card glass">
          {submitted ? (
            <div className="auth-success">
              <span>
                <Icon name="check" size={28} />
              </span>
              <h2>{isSignup ? "Account created" : "You’re signed in"}</h2>
              <p>
                {isSignup
                  ? "Your secure Cipher workspace is ready."
                  : "Welcome back to your security dashboard."}
              </p>
              <button className="button primary" type="button" onClick={onBack}>
                Open password checker <Icon name="arrow" />
              </button>
            </div>
          ) : (
            <>
              <div className="auth-card-head">
                <span className="auth-icon">
                  <Icon name={isSignup ? "user" : "lock"} size={21} />
                </span>
                <h2>
                  {isSignup ? "Create your account" : "Sign in to Cipher"}
                </h2>
                <p>
                  {isSignup
                    ? "Start securing your digital life in seconds."
                    : "Enter your details to access your account."}
                </p>
              </div>
              <div className="auth-tabs">
                <button
                  className={!isSignup ? "active" : ""}
                  type="button"
                  onClick={() => onModeChange("login")}
                >
                  Sign in
                </button>
                <button
                  className={isSignup ? "active" : ""}
                  type="button"
                  onClick={() => onModeChange("signup")}
                >
                  Create account
                </button>
              </div>
              <form className="auth-form" onSubmit={submit}>
                {isSignup && (
                  <label>
                    <span>Full name</span>
                    <div className="auth-input">
                      <Icon name="user" />
                      <input
                        type="text"
                        placeholder="Jane Smith"
                        autoComplete="name"
                        required
                      />
                    </div>
                  </label>
                )}
                <label>
                  <span>Email address</span>
                  <div className="auth-input">
                    <Icon name="mail" />
                    <input
                      type="email"
                      placeholder="you@example.com"
                      autoComplete="email"
                      required
                    />
                  </div>
                </label>
                <label>
                  <span className="label-row">
                    <span>Password</span>
                    {!isSignup && (
                      <button type="button">Forgot password?</button>
                    )}
                  </span>
                  <div className="auth-input">
                    <Icon name="lock" />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder={
                        isSignup
                          ? "At least 12 characters"
                          : "Enter your password"
                      }
                      minLength={isSignup ? 12 : 1}
                      autoComplete={
                        isSignup ? "new-password" : "current-password"
                      }
                      required
                    />
                    <button
                      className="auth-eye"
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      <Icon name={showPassword ? "eyeOff" : "eye"} />
                    </button>
                  </div>
                </label>
                {isSignup && (
                  <label className="terms">
                    <input type="checkbox" required />
                    <span>
                      I agree to the <a href="#terms">Terms of Service</a> and{" "}
                      <a href="#privacy">Privacy Policy</a>.
                    </span>
                  </label>
                )}
                <button className="button primary auth-submit" type="submit">
                  {isSignup ? "Create secure account" : "Sign in securely"}{" "}
                  <Icon name="arrow" />
                </button>
              </form>
              <p className="auth-switch">
                {isSignup ? "Already have an account?" : "New to Cipher?"}{" "}
                <button
                  type="button"
                  onClick={() => onModeChange(isSignup ? "login" : "signup")}
                >
                  {isSignup ? "Sign in" : "Create an account"}
                </button>
              </p>
            </>
          )}
        </section>
      </div>
    </main>
  );
}

function App() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("cipher-theme");
    if (savedTheme === "light" || savedTheme === "dark") return savedTheme;
    return window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
  });
  const [authMode, setAuthMode] = useState(null);
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [analyzed, setAnalyzed] = useState(true);
  const [generator, setGenerator] = useState({
    length: 18,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
    excludeSimilar: false,
    excludeAmbiguous: false,
  });
  const [generated, setGenerated] = useState("K7!vQ2#nX9@mR4$zLp");
  const [openTip, setOpenTip] = useState(null);
  const analysis = useMemo(() => analyzePassword(password), [password]);
  const display = analyzed ? analysis : analyzePassword("");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    localStorage.setItem("cipher-theme", theme);
  }, [theme]);

  const generate = (useMain = false) => {
    const next = makePassword(generator);
    setGenerated(next);
    if (useMain) {
      setPassword(next);
      setAnalyzed(true);
    }
  };

  if (authMode)
    return (
      <AuthPage
        mode={authMode}
        onModeChange={setAuthMode}
        onBack={() => setAuthMode(null)}
        theme={theme}
        onThemeToggle={() => setTheme(theme === "dark" ? "light" : "dark")}
      />
    );

  return (
    <main>
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <nav className="nav">
        <a className="brand" href="#" aria-label="Cipher home">
          <span className="brand-mark">
            <Icon name="shield" />
          </span>
          <span>Cipher</span>
        </a>
        <div className="nav-actions">
          <div className="secure-pill">
            <span className="pulse-dot" />
            100% private · runs locally
          </div>
          <ThemeToggle
            theme={theme}
            onToggle={() => setTheme(theme === "dark" ? "light" : "dark")}
          />
          <button
            className="nav-login"
            type="button"
            onClick={() => setAuthMode("login")}
          >
            Sign in
          </button>
          <button
            className="nav-signup"
            type="button"
            onClick={() => setAuthMode("signup")}
          >
            Create account
          </button>
        </div>
      </nav>

      <section className="hero">
        <div className="eyebrow">
          <Icon name="shield" size={15} /> Password security, simplified
        </div>
        <h1>
          Check Your Password <span>Strength</span>
        </h1>
        <p>
          Instantly analyze your password security and estimate how resistant it
          is against modern attacks.
        </p>

        <div className="checker">
          <div className="input-label">
            <span>Password</span>
          </div>
          <div className="password-row">
            <div className="password-field">
              <input
                aria-label="Password to analyze"
                type={visible ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setAnalyzed(true);
                }}
                placeholder="Enter a password to analyze..."
              />
              <button
                className="field-action eye-button"
                type="button"
                onClick={() => setVisible(!visible)}
                aria-label={visible ? "Hide password" : "Show password"}
              >
                <Icon name={visible ? "eyeOff" : "eye"} />
              </button>
              <div className="field-copy">
                <CopyButton value={password} compact />
              </div>
            </div>
            <button
              className="button secondary generate-top"
              type="button"
              onClick={() => generate(true)}
            >
              <Icon name="sparkle" />
              <span>Generate</span>
            </button>
            <button
              className="button primary"
              type="button"
              onClick={() => setAnalyzed(true)}
            >
              <span>Analyze</span>
              <Icon name="arrow" />
            </button>
          </div>
        </div>
      </section>

      <div className="content">
        <section className="glass analysis-card">
          <div className="section-heading">
            <div>
              <span className="section-kicker">PASSWORD ANALYSIS</span>
              <h2>Your security overview</h2>
            </div>
            <div className={`strength-badge ${display.level.toLowerCase()}`}>
              <span />
              {display.level}
            </div>
          </div>
          <div className="progress-meta">
            <span>Security strength</span>
            <strong>
              {display.score}
              <small>/100</small>
            </strong>
          </div>
          <div className="progress-track">
            <div
              className={`progress-fill ${display.level.toLowerCase()}`}
              style={{ width: `${display.score}%` }}
            />
          </div>
          <div className="metrics">
            <div className="metric">
              <span className="metric-icon violet">
                <Icon name="clock" />
              </span>
              <div>
                <span>EST. CRACK TIME</span>
                <strong>{display.crackTime}</strong>
              </div>
            </div>
            <div className="metric">
              <span className="metric-icon blue">
                <Icon name="chart" />
              </span>
              <div>
                <span>ENTROPY</span>
                <strong>
                  {display.entropy} <small>bits</small>
                </strong>
              </div>
            </div>
            <div className="metric">
              <span className="metric-icon amber">
                <Icon name="hash" />
              </span>
              <div>
                <span>LENGTH</span>
                <strong>
                  {password.length} <small>characters</small>
                </strong>
              </div>
            </div>
            <div className="metric">
              <span className="metric-icon green">
                <Icon name="layers" />
              </span>
              <div>
                <span>CHARACTER TYPES</span>
                <p>
                  {display.types.length ? (
                    display.types.map((type) => <b key={type}>{type}</b>)
                  ) : (
                    <small>None detected</small>
                  )}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="two-column">
          <div className="glass checklist-card">
            <div className="section-heading compact">
              <div>
                <span className="section-kicker">SECURITY CHECKLIST</span>
                <h2>Protection essentials</h2>
              </div>
              <span className="count-badge">
                {display.checks.filter((c) => c[2]).length}/7
              </span>
            </div>
            <div className="checklist">
              {display.checks.map(([id, label, ok]) => (
                <div className={`check-item ${ok ? "passed" : ""}`} key={id}>
                  <span className="check-status">{ok ? "✓" : "×"}</span>
                  <span>{label}</span>
                  <small>{ok ? "Passed" : "Missing"}</small>
                </div>
              ))}
            </div>
          </div>
          <div className="suggestions-wrap">
            <div className="section-heading compact outside">
              <div>
                <span className="section-kicker">SMART SUGGESTIONS</span>
                <h2>Make it even stronger</h2>
              </div>
            </div>
            <div className="suggestions-grid">
              {[
                [
                  "sparkle",
                  "Add special characters",
                  "Symbols dramatically expand the possible combinations.",
                  display.checks[3][2],
                ],
                [
                  "hash",
                  "Increase password length",
                  "Aim for 16+ characters for stronger protection.",
                  password.length >= 16,
                ],
                [
                  "bulb",
                  "Avoid dictionary words",
                  "Random phrases resist automated guessing attacks.",
                  display.checks[6][2],
                ],
                [
                  "layers",
                  "Mix letter cases",
                  "Combine uppercase and lowercase throughout.",
                  display.checks[0][2] && display.checks[1][2],
                ],
              ].map(([icon, title, text, done]) => (
                <article
                  className={`suggestion ${done ? "done" : ""}`}
                  key={title}
                >
                  <span className="suggestion-icon">
                    <Icon name={done ? "check" : icon} />
                  </span>
                  <div>
                    <h3>{title}</h3>
                    <p>
                      {done ? "Your password meets this recommendation." : text}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="glass generator-card">
          <div className="generator-head">
            <div className="section-heading compact">
              <span className="large-icon">
                <Icon name="sparkle" size={22} />
              </span>
              <div>
                <span className="section-kicker">PASSWORD GENERATOR</span>
                <h2>Create an unbreakable password</h2>
              </div>
            </div>
            <span className="secure-tag">
              <Icon name="shield" size={14} /> Cryptographically secure
            </span>
          </div>
          <div className="generated-row">
            <div className="generated-password">{generated}</div>
            <CopyButton value={generated} />
          </div>
          <div className="generator-controls">
            <div className="length-control">
              <label htmlFor="length">
                <span>Password length</span>
                <strong>{generator.length}</strong>
              </label>
              <input
                id="length"
                type="range"
                min="8"
                max="32"
                value={generator.length}
                onChange={(e) =>
                  setGenerator({ ...generator, length: Number(e.target.value) })
                }
                style={{ "--range": `${((generator.length - 8) / 24) * 100}%` }}
              />
              <div className="range-labels">
                <span>8</span>
                <span>20</span>
                <span>32</span>
              </div>
            </div>
            <div className="toggles">
              {[
                ["uppercase", "Uppercase", "ABC"],
                ["lowercase", "Lowercase", "abc"],
                ["numbers", "Numbers", "123"],
                ["symbols", "Symbols", "#$&"],
                ["excludeSimilar", "Exclude similar", "Il1"],
                ["excludeAmbiguous", "Exclude ambiguous", "{}[]"],
              ].map(([key, label, example]) => (
                <label className="toggle-row" key={key}>
                  <span>
                    <b>{label}</b>
                    <small>{example}</small>
                  </span>
                  <input
                    type="checkbox"
                    checked={generator[key]}
                    onChange={() =>
                      setGenerator({ ...generator, [key]: !generator[key] })
                    }
                  />
                  <i />
                </label>
              ))}
            </div>
          </div>
          <button
            className="button primary generator-button"
            type="button"
            onClick={() => generate(false)}
          >
            <Icon name="sparkle" />
            <span>Generate new password</span>
          </button>
        </section>

        <section className="tips">
          <div className="tips-heading">
            <span className="section-kicker">SECURITY BEST PRACTICES</span>
            <h2>Stay one step ahead</h2>
            <p>
              Small habits make a big difference in keeping your digital life
              secure.
            </p>
          </div>
          <div className="tip-grid">
            {[
              [
                "key",
                "Use unique passwords",
                "Never reuse passwords across accounts. One breach should never unlock everything.",
                "A unique password isolates every account. If one service is compromised, attackers cannot reuse those credentials to access your email, banking or social profiles.",
                "01",
              ],
              [
                "userCheck",
                "Enable two-factor authentication",
                "Add a second layer of protection to your most important accounts.",
                "Prefer an authenticator app or a physical security key when available. They provide stronger protection than verification codes received by SMS.",
                "02",
              ],
              [
                "vault",
                "Use a password manager",
                "Securely generate, store and autofill strong passwords everywhere.",
                "A trusted password manager lets you use long, random passwords without memorizing them. Protect the vault with one strong master password and two-factor authentication.",
                "03",
              ],
            ].map(([icon, title, text, details, n], index) => {
              const isOpen = openTip === index;
              return (
                <article
                  className={`tip-card ${isOpen ? "expanded" : ""}`}
                  key={title}
                >
                  <span className="tip-number">{n}</span>
                  <span className="tip-icon">
                    <Icon name={icon} size={23} />
                  </span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <div className="accordion-content" aria-hidden={!isOpen}>
                    <div>
                      <p>{details}</p>
                    </div>
                  </div>
                  <button
                    className="learn"
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenTip(isOpen ? null : index)}
                  >
                    <span>{isOpen ? "Show less" : "Learn more"}</span>
                    <span className="accordion-arrow">
                      <Icon name="arrow" size={16} />
                    </span>
                  </button>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}

export default App;
