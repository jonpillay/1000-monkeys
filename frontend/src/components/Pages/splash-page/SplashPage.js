import "./SplashPage.css";
// import WelcomePanel from "../../SplashPageParts/welcome-panel/WelcomePanel";
import SplashTabs from "../../SplashPageParts/splash-tabs/SplashTabs";
import LoginCreateContainer from "../../SplashPageParts/login-create-container/LoginCreateContainer"
import { useAuthContext } from "../../../hooks/useAuthContext";

import { useLocation } from "react-router";

import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { resetStorySysInfo } from "../create-stories-page/storyBookSysInfoSlice";
import { selectAllWarnings, resetWarnings } from "../../app/systemInfoSlice";
import { clearReduxPersist } from "../../../redux-state/store";

import WarningSplash from "../../SplashPageParts/warning-splash/WarningSplash"


const SplashContainer = (props) => {

  const reduxDispatch = useDispatch()

  const warnings = useSelector(selectAllWarnings)

  const [ waggingFinger, setWaggingFinger ] = useState(false)

  const [ warningState, setWarningState ] = useState()

  const location = useLocation()

  // useEffect(() => {

  //   if (warnings >= 5) {

  //     setWaggingFinger(true)

  //     let timeoutId;

  //     timeoutId = setTimeout(() => {
  //         setWaggingFinger(false)
  //         reduxDispatch(resetWarnings())
  //       }, 5000);


  //     return () => {
  //         clearTimeout(timeoutId);
  //       };
  //   }
  // }, [])

  useEffect(() => {

    if (location.state?.warnedState) {
      if (location.state?.warnedState == "TOKENEXPIRELOGOUT") {
        alert("Token Expired. You Have been Logged out. Please login.")
      } else {
        setWaggingFinger(true)
        setWarningState(location.state?.warnedState)
      }

      }
    }, [])

  return (
    <>
    { !waggingFinger ? (
      <>
        <div className="splash-container">
          <div className="splash-grid">
            <SplashTabs/>
            <LoginCreateContainer/>
          </div>
        </div>         
      </>
      ) : (
        <WarningSplash warnedState={warningState} setWaggingFinger={setWaggingFinger}/>
      )    
    }
    </>
  )
}

export default SplashContainer;