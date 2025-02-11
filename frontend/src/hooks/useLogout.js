import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { StoryContext } from "../context/StoryContext"
import { clearReduxPersist } from "../redux-state/store"
import { useDispatch } from "react-redux"
import { resetStoryBookSlice } from "../components/CreateStoryPageParts/story-book-create/storyBookSlice"
import { resetSysInfo } from "../components/Pages/create-stories-page/storyBookSysInfoSlice"
import { useNavigate } from "react-router"

const clearLocal = require("./useClearLocal")

export const useLogout = () => {

  const navigate = useNavigate()

  const {dispatch} = useContext(AuthContext)
  const {dispatch: storyDispatch} = useContext(StoryContext)

  const reduxDispatch = useDispatch()

  const clearLocalLogout = async () => {
    localStorage.removeItem('user')
    localStorage.removeItem('credits')
    localStorage.removeItem('browsePageNumbers')
    localStorage.removeItem('activateEndTime')
    localStorage.removeItem('localGPTPromptHistory')
  }

  const logout = async () => {
    await clearLocalLogout()
    reduxDispatch(resetStoryBookSlice())
    reduxDispatch(resetSysInfo())
    clearReduxPersist()
    dispatch({type: 'LOGOUT'})
    storyDispatch({ type: 'END' })
    navigate('/')
  }

  return {logout}
}