import { useAuthContext } from "./useAuthContext"
import { useNavigate } from "react-router"
const clearLocal = require("./useClearLocal")

export const useLogout = () => {

  // const { clearLocal } = useClearLocal()
  const { dispatch } = useAuthContext()

  const logout = () => {
    dispatch({type: 'LOGOUT'})
  }

  return {logout}

}