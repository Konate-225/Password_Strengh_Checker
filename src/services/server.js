import { endpoints } from "./endpoints"

export const Login = async (email, password) => {
  const response = await fetch(endpoints.login, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) {
    throw new Error(await getErrorMessage(response, "Login failed"))
  }

  return response.json()
}


export const Register = async (fullname, email, password) => {
  const response = await fetch(endpoints.register, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({ fullname, email, password }),
    });
  if (!response.ok) {
    throw new Error(await getErrorMessage(response, "Registration failed"))
  }

  return response.json()

}

export const GetMe = async (token) => {
  const response = await fetch(endpoints.me, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error(await getErrorMessage(response, "Failed to fetch user data"))
  }
  return response.json()
}

async function getErrorMessage(response, fallback) {
  try {
    const data = await response.json()
    return data.detail || data.message || data.error || fallback
  } catch {
    return fallback
  }
}