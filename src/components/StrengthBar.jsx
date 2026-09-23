function StrengthBar({ score, strength }) {
  const strengthClass = strength.toLowerCase()

  return (
    <section className="strength-section" aria-label="Password strength">
      <div className="strength-heading">
        <span>Password strength</span>
        <span className={`strength-label ${strengthClass}`}>{strength}</span>
      </div>
      <div
        className="progress-track"
        role="progressbar"
        aria-label="Password strength score"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow={score}
      >
        <div className={`progress-fill ${strengthClass}`} style={{ width: `${score}%` }} />
      </div>
      <p className="score-text">{score}% secure</p>
    </section>
  )
}

export default StrengthBar
