import "./SplashPage.css";
import WelcomePanel from "../../SplashPageParts/welcome-panel/WelcomePanel";
import LoginCreateContainer from "../../SplashPageParts/login-create-container/LoginCreateContainer"
import { useAuthContext } from "../../../hooks/useAuthContext";

import { useLocation } from "react-router";

import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { resetStorySysInfo } from "../create-stories-page/storyBookSysInfoSlice";
import { selectAllWarnings, resetWarnings } from "../../app/systemInfoSlice";
import { clearReduxPersist } from "../../../redux-state/store";

const SplashContainer = (props) => {

  const reduxDispatch = useDispatch()

  const warnings = useSelector(selectAllWarnings)

  const [ waggingFinger, setWaggingFinger ] = useState(false)

  useEffect(() => {

    if (warnings >= 5) {

      setWaggingFinger(true)

      let timeoutId;

      timeoutId = setTimeout(() => {
          setWaggingFinger(false)
          reduxDispatch(resetWarnings())
        }, 5000);


      return () => {
          clearTimeout(timeoutId);
        };
    }
  }, [])
  
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
    { !waggingFinger ? (
      <>
        <div className="splash-container">
          <div className="splash-grid">
            <WelcomePanel/>
            <LoginCreateContainer/>
          </div>
        </div>         
      </>
      ) : (
        "BOOP"
      )    
    }
    </>
  )
}

export default SplashContainer;