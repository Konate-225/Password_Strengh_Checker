const API_URL = (import.meta.env.API_URL || "").replace(/\/$/, "")

export const endpoints = {
  login: `${API_URL}/auth/login`,
  register: `${API_URL}/auth/register`,
  me: `${API_URL}/auth/me`,
}