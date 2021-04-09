export const isBrowser = () => typeof window !== "undefined"

export const getUser = () =>
  isBrowser() && window.localStorage.getItem("gatsbyUser")
    ? JSON.parse(window.localStorage.getItem("gatsbyUser"))
    : {}

export const setUser = user =>
  window.localStorage.setItem("gatsbyUser", JSON.stringify(user))


export const isLoggedIn = () => {
  try{
    const user = getUser().user.email
    return !!user
  }catch{
    return false;
  }
}

export const logout = callback => {
  setUser({})
  callback()
}
