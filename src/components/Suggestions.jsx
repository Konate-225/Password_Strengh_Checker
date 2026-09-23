function Suggestions({ missingRequirements }) {
  const isStrong = missingRequirements.length === 0

  return (
    <section className={`info-panel suggestions-panel ${isStrong ? 'success' : ''}`} aria-labelledby="suggestions-title">
      <h2 id="suggestions-title">Suggestions</h2>
      {isStrong ? (
        <p className="success-message">
          <span aria-hidden="true">✓</span>
          Excellent! Your password is strong.
        </p>
      ) : (
        <ul className="suggestions-list">
          {missingRequirements.map((requirement) => (
            <li key={requirement.id}>{requirement.suggestion}</li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default Suggestions
