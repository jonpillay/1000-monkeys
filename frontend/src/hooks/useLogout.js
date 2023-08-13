import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { useNavigate } from "react-router"
const clearLocal = require("./useClearLocal")

export const useLogout = () => {

  // const { clearLocal } = useClearLocal()
  const {dispatch} = useContext(AuthContext)

  const { navigate } = useNavigate()

  const logout = () => {
    localStorage.removeItem('user')
    dispatch({type: 'LOGOUT'}) 
  }

  return {logout}

}