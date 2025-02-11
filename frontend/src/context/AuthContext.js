import { createContext, useReducer, useEffect } from 'react'
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext()

export const AuthReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {user: action.payload}
    case 'LOGOUT':
      return {user: null}
    default:
      return state
  }
}

export const AuthContextProvider = ({ children }) => {

  const [state, dispatch] = useReducer(AuthReducer, {
    user: JSON.parse(localStorage.getItem('user'))
  })

  useEffect(() => {

    const user = JSON.parse(localStorage.getItem('user'))

    if (user) {

      const exp = jwtDecode(user.token).exp

      if (exp * 1000 < Date.now()) {
        dispatch({type: 'LOGOUT'})
        localStorage.removeItem('user')
        localStorage.removeItem('credits')
      } else {
        console.log("No Boop")
      }
    }
  }, [])

  return (
    <AuthContext.Provider value={{...state, dispatch}}>
      {children}
    </AuthContext.Provider>
  )
}