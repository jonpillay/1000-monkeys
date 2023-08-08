import { useAuthContext } from "./useAuthContext"
import { useNavigate } from "react-router"
const clearLocal = require("./useClearLocal")

export const useLogout = () => {

  // const { clearLocal } = useClearLocal()
  const { dispatch } = useAuthContext()

  const logout = () => {
    const disLogout = setTimeout(function(){
      localStorage.clear()
    }, 200);
    dispatch({type: 'LOGOUT'})
  }

  return {logout}

}