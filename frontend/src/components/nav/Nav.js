import { useContext } from "react";
import './nav.css'
import NavButton from '../navbutton/NavButton';
import UserPanel from "../user-panel/UserPanel";

import { useLogout } from "../../hooks/useLogout";
import { useNavigate } from "react-router";
import { useStoryContext } from "../../hooks/useStoryContext";
import { useAuthContext } from "../../hooks/useAuthContext";
// import { clearLocal } from "../../hooks/useClearLocal";

// import logged in context as defined in App.js
// import {loggedInContext} from '../app/App';

const clearLocal = require('../../hooks/useClearLocal')

const NavBar = () => {

// set consts for loggedIn and setLoggedIn (funct) to be accessed within the component
// const [loggedIn, setLoggedIn] = useContext(loggedInContext)

  const { navigate } = useNavigate()
  const { logout } = useLogout()

  const { dispatch } = useStoryContext()
  const { user } = useAuthContext()
  const { story } = useStoryContext()

  async function clearStorageLogout() {
    return new Promise((resolve) => {
      dispatch({type: "END", payload: null})
      localStorage.removeItem("user")
      localStorage.removeItem("GPTPromptHistory")
      localStorage.removeItem("userChoices");
      localStorage.removeItem("storyPages");
      localStorage.removeItem("sysInfo")
      resolve()
    })
  }

  const Logout = async() => {
    await clearStorageLogout()
    logout()
  }

  const endStory = () => {
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
              <NavButton to="/activate" value="I Have an Invite Key!" className="invite-button" />
              <NavButton to="/" value="Login" className="login-button" />
            </>
          )}
        </div>
      </>
    );
}

export default NavBar;