import { useContext } from "react";
import './nav.css'
import NavButton from '../navbutton/NavButton';
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
      <div className="nav-container">
        <div className="nav-box">
          {(story ? 
          <>
            <button className="nav-button" onClick={endStory}>End Story</button>
          </>
          :
          <></>
          )}
          {(user ?
          <>
            <button className="logout-button" onClick={Logout}>Logout</button>
          </>
          :
            <>
              <NavButton className="nav-button" to="/signup" value="I Have an Invite Key!"/>
              <NavButton className="login-button" to="/" value="Login"/>
            </>
          )}
        </div>
      </div>
      </>
    );
}

export default NavBar;