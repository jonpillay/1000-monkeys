import { useContext } from "react";
import './nav.css'
import NavButton from '../navbutton/NavButton';
import { useLog, useLogout } from "../../hooks/useLogout";
import { useClearLocal } from "../../hooks/useClearLocal";

// import logged in context as defined in App.js
// import {loggedInContext} from '../app/App';
import { useNavigate } from "react-router";

const NavBar = () => {

// set consts for loggedIn and setLoggedIn (funct) to be accessed within the component
// const [loggedIn, setLoggedIn] = useContext(loggedInContext)

  const navigate = useNavigate()
  const { logout } = useLogout()

  const handleClick = () => {
    localStorage.removeItem('user')
    logout()
  }

    return (
      <>
      <div className="nav-container">
          {(true ?
          <div className="nav-box">
            <NavButton to="/posts" value="Posts"/>
            <NavButton to="/account" value="Your Account"/>
            <button className="logout-button" onClick={handleClick}>Logout</button>
          </div>
          :
          <div className="nav-box">
            <div>
              <NavButton className="nav-button" to="/signup" value="Sign-up"/>

              <NavButton className="login-button" to="/login" value="Login"/>
            </div>
          </div>
          )}
      </div>
      </>
    );
}

export default NavBar;