import { useContext } from "react";
import './nav.css'
import NavButton from '../navbutton/NavButton';
import UserPanel from "../user-panel/UserPanel";

import { useLogout } from "../../hooks/useLogout";
import { Navigate, useNavigate } from "react-router";
import { useStoryContext } from "../../hooks/useStoryContext";
import { useAuthContext } from "../../hooks/useAuthContext";

import { clearReduxPersist } from "../../redux-state/store";
import { useDispatch } from "react-redux";
import { selectAllChapterImages, selectAllChapterTexts, selectRenderChapter, reset } from '../story-book/storyBookSlice';

// import { clearLocal } from "../../hooks/useClearLocal";

// import logged in context as defined in App.js
// import {loggedInContext} from '../app/App';

const clearLocal = require('../../hooks/useClearLocal')

const NavBar = () => {

// set consts for loggedIn and setLoggedIn (funct) to be accessed within the component
// const [loggedIn, setLoggedIn] = useContext(loggedInContext)

  const reduxDispatch = useDispatch()

  const navigate = useNavigate()
  const { logout } = useLogout()

  const { dispatch } = useStoryContext()
  const { user } = useAuthContext()
  const { story } = useStoryContext()

  const clearRedux = () => {
    reduxDispatch(reset())
    clearReduxPersist()
  }

  async function clearStorageLogout() {
    return new Promise((resolve) => {
      dispatch({type: "END", payload: null})
      localStorage.removeItem("user")
      localStorage.removeItem("GPTPromptHistory")
      localStorage.removeItem("userChoices");
      localStorage.removeItem("storyPages");
      localStorage.removeItem("sysInfo");
      localStorage.removeItem("browsePageNumbers")
      clearRedux()
      resolve()
    })
  }

  const Logout = async() => {
    await clearStorageLogout()
    logout()
  }

  const endStory = async () => {
    await localStorage.removeItem('storyPages')
    await localStorage.removeItem('sysInfo');
    await localStorage.removeItem('userChoices');
    await localStorage.removeItem('GPTPromptHistory');

    clearRedux()

    dispatch({type: "END", payload: null})
  }

    return (
      <>
      <div className="header-nav-container">
        {(story ? 
          <>
            <button className="nav-button" onClick={endStory}>End Story</button>
          </>
        :
        <></>
        )}
        {(user ?
          <>
            <UserPanel/>
            <button className="logout-button" onClick={Logout}>Logout</button>
          </>
        :
          <>
            <button onClick={() => navigate('/activate')} className="invite-button">I have an invite key!</ button>
            <button onClick={() => navigate('/')} className="login-button" >Login</button>
          </>
        )}
      </div>
      </>
    );
}

export default NavBar;