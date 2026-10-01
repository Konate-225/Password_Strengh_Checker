import Icon from "./Icon"

function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === "dark"

  return (
    <button className="theme-toggle" type="button" onClick={onToggle} aria-label={`Switch to ${isDark ? "light" : "dark"} theme`} title={`Switch to ${isDark ? "light" : "dark"} theme`}>
      <Icon name={isDark ? "sun" : "moon"} />
      <span>{isDark ? "Light" : "Dark"}</span>
    </button>
  )
}

export default ThemeToggle
