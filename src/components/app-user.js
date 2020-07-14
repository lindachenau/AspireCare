const isBrowser = typeof window !== `undefined`

export const setUser = user =>
  (window.localStorage.aspireMedCentreUser = JSON.stringify(user))

export const getUser = () => {
  if (window.localStorage.aspireMedCentreUser) {
    let user = JSON.parse(window.localStorage.aspireMedCentreUser)
    return user ? user : {}
  }
  return {}
}

export const isLoggedIn = () => {
  if (!isBrowser) return false

  const user = getUser()
  if (user) return !!user.username
}

export const getCurrentUser = () => isBrowser && getUser()

export const logout = () => {
  if (!isBrowser) return
  setUser({})
}
