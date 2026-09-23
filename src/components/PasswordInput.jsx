function PasswordInput({ password, showPassword, onChange, onToggleVisibility }) {
  return (
    <div className="input-section">
      <label htmlFor="password">Enter your password</label>
      <div className="input-wrapper">
        <input
          id="password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={onChange}
          placeholder="Type a password..."
          autoComplete="new-password"
        />
        <button
          className="visibility-button"
          type="button"
          onClick={onToggleVisibility}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
          aria-pressed={showPassword}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            {showPassword ? (
              <>
                <path d="M3 3l18 18" />
                <path d="M10.6 10.7a2 2 0 0 0 2.7 2.7M9.8 5.2A9.9 9.9 0 0 1 12 5c5.5 0 9 7 9 7a16 16 0 0 1-2.1 3.1M6.6 6.6C4.3 8.1 3 12 3 12s3.5 7 9 7c1.2 0 2.3-.3 3.3-.7" />
              </>
            ) : (
              <>
                <path d="M3 12s3.5-7 9-7 9 7 9 7-3.5 7-9 7-9-7-9-7Z" />
                <circle cx="12" cy="12" r="2.5" />
              </>
            )}
          </svg>
        </button>
      </div>
    </div>
  )
}

export default PasswordInput
