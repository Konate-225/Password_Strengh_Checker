import Icon from "./Icon"
import ThemeToggle from "./ThemeToggle"

function AppHeader({ theme, onThemeToggle, onLogin, onSignup, user, onLogout }) {
  return (
    <nav className="nav">
      <a className="brand" href="/" aria-label="Cipher home">
        <span className="brand-mark"><Icon name="shield" /></span>
        <span>Cipher</span>
      </a>
      <div className="nav-actions">
        <div className="secure-pill"><span className="pulse-dot" />100% private · runs locally</div>
        <ThemeToggle theme={theme} onToggle={onThemeToggle} />
        {user ? (
          <div className="profile-menu">
            <span className="profile-avatar">{(user.fullname || user.email || "U")[0].toUpperCase()}</span>
            <span className="profile-details"><strong>{user.fullname || "Connected user"}</strong><small>{user.email}</small></span>
            <button className="nav-login" type="button" onClick={onLogout}>Sign out</button>
          </div>
        ) : (
          <><button className="nav-login" type="button" onClick={onLogin}>Sign in</button><button className="nav-signup" type="button" onClick={onSignup}>Create account</button></>
        )}
      </div>
    </nav>
  )
}

export default AppHeader
