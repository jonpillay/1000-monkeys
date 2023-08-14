import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { useNavigate } from "react-router"
const clearLocal = require("./useClearLocal")

export const useLogout = () => {

  const {dispatch} = useContext(AuthContext)

  const clearLocalLogout = () => {
    localStorage.removeItem('user')
    // localStorage.removeItem('story')
  }

  const logout = async () => {
    await clearLocalLogout()
    dispatch({type: 'LOGOUT'}) 
  }

  return {logout}

}