import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
const clearLocal = require("./useClearLocal")

export const useLogout = () => {

  const {dispatch} = useContext(AuthContext)

  const clearLocalLogout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('credits')
    // localStorage.removeItem('story')
  }

  const logout = async () => {
    await clearLocalLogout()
    dispatch({type: 'LOGOUT'}) 
  }

  return {logout}

}