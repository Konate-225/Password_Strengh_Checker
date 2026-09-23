function RequirementsList({ requirements }) {
  return (
    <section className="info-panel" aria-labelledby="requirements-title">
      <h2 id="requirements-title">Password requirements</h2>
      <ul className="requirements-list">
        {requirements.map((requirement) => (
          <li className={requirement.completed ? 'completed' : ''} key={requirement.id}>
            <span className="status-icon" aria-hidden="true">
              {requirement.completed ? '✓' : '×'}
            </span>
            <span>{requirement.label}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default RequirementsList
