import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { clearReduxPersist } from "../redux-state/store"
import { useDispatch } from "react-redux"
import { reset } from "../components/story-book/storyBookSlice"
import { resetSysInfo } from "../components/create-stories-page/storyBookSysInfoSlice"

const clearLocal = require("./useClearLocal")

export const useLogout = () => {

  const {dispatch} = useContext(AuthContext)

  const reduxDispatch = useDispatch()

  const clearLocalLogout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('credits')
    // localStorage.removeItem('story')
  }

  const logout = async () => {
    await clearLocalLogout()
    reduxDispatch(reset())
    reduxDispatch(resetSysInfo())
    clearReduxPersist()
    dispatch({type: 'LOGOUT'}) 
  }

  return {logout}

}