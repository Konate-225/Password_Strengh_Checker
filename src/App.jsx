import { useEffect, useState } from "react"
import AuthPage from "./pages/AuthPage"
import CheckerPage from "./pages/CheckerPage"
import { GetMe } from "./services/server"
import "./styles/App.css"

function getRoute() {
  const path = window.location.pathname
  if (path === "/login") return "login"
  if (path === "/signup") return "signup"
  return "checker"
}

function App() {
  const [route, setRoute] = useState(getRoute)
  const [session, setSession] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cipher-session"))
    } catch {
      return null
    }
  })
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("cipher-theme")
    if (savedTheme === "light" || savedTheme === "dark") return savedTheme
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"
  })

  useEffect(() => {
    const handlePopState = () => setRoute(getRoute())
    window.addEventListener("popstate", handlePopState)
    return () => window.removeEventListener("popstate", handlePopState)
  }, [])

  useEffect(() => {
    const token = session?.token
    if (!token) return
    GetMe(token).then((user) => setSession({ token, user })).catch(() => {
      localStorage.removeItem("cipher-session")
      setSession(null)
    })
  }, [session?.token])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.style.colorScheme = theme
    localStorage.setItem("cipher-theme", theme)
  }, [theme])

  const navigate = (nextRoute) => {
    const path = nextRoute === "checker" ? "/" : `/${nextRoute}`
    window.history.pushState({}, "", path)
    setRoute(nextRoute)
  }

  const toggleTheme = () => setTheme((current) => current === "dark" ? "light" : "dark")

  const authenticate = (nextSession) => {
    localStorage.setItem("cipher-session", JSON.stringify(nextSession))
    setSession(nextSession)
    navigate("checker")
  }

  const logout = () => {
    localStorage.removeItem("cipher-session")
    setSession(null)
    navigate("checker")
  }

  if (route === "login" || route === "signup") {
    return <AuthPage mode={route} onModeChange={navigate} onBack={() => navigate("checker")} onAuthenticated={authenticate} theme={theme} onThemeToggle={toggleTheme} />
  }

  return <CheckerPage theme={theme} onThemeToggle={toggleTheme} onLogin={() => navigate("login")} onSignup={() => navigate("signup")} user={session?.user} onLogout={logout} />
}

export default App
