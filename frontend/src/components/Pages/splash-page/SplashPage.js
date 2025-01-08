import "./SplashPage.css";
import WelcomePanel from "../../SplashPageParts/welcome-panel/WelcomePanel";
import LoginCreateContainer from "../../SplashPageParts/login-create-container/LoginCreateContainer"
import { useAuthContext } from "../../../hooks/useAuthContext";

import { useLocation } from "react-router";

import { useEffect } from "react";

import { useDispatch } from "react-redux";
import { resetStorySysInfo } from "../create-stories-page/storyBookSysInfoSlice";
import { clearReduxPersist } from "../../../redux-state/store";

const SplashContainer = (props) => {

  const reduxDispatch = useDispatch()
  
  const location = useLocation()

  useEffect(() => {

    if (location.state?.warnedState) {
      reduxDispatch(resetStorySysInfo())
      clearReduxPersist()
      }
    }
  )

  return (
    <>
    <div className="splash-container">
      <div className="splash-grid">
        <WelcomePanel/>
        <LoginCreateContainer/>
      </div>
    </div>
    </>
  )
}

export default SplashContainer;