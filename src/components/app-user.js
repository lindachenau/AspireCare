const isBrowser = typeof window !== `undefined`

/*
*   All attributes in AWS CognitoUser object: 
*   username: set after successful login and cleared after successful logout
*   patientName, patientId, patientIndex: set when patient is selected (in patients.js) and cleared after appointment is booked (in book.js) 
*   appId: set when an appointment is selected (in appointment-browser.js) and cleared after appointment is booked (in book.js)
*   checkingBookingStatus: set after booking to display appointments in my-account page. cleared after my-account page mounts. 
*
*   newPatientId: 
*
*/
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
