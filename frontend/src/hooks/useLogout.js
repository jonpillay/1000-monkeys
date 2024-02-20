import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { clearReduxPersist } from "../redux-state/store"
import { useDispatch } from "react-redux"
import { resetStoryBookSlice } from "../components/story-book/storyBookSlice"
import { resetSysInfo } from "../components/create-stories-page/storyBookSysInfoSlice"
import { useNavigate } from "react-router"


const clearLocal = require("./useClearLocal")

export const useLogout = () => {

  const navigate = useNavigate()

  const {dispatch} = useContext(AuthContext)

  const reduxDispatch = useDispatch()

  const clearLocalLogout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('credits')
    localStorage.removeItem('credits')
    // localStorage.removeItem('story')
  }

  const logout = async () => {
    await clearLocalLogout()
    reduxDispatch(resetStoryBookSlice())
    reduxDispatch(resetSysInfo())
    clearReduxPersist()
    dispatch({type: 'LOGOUT'}) 
    navigate('/')
  }

  return {logout}

}