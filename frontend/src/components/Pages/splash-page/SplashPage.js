import "./SplashPage.css";
import WelcomePanel from "../../SplashPageParts/welcome-panel/WelcomePanel";
import LoginCreateContainer from "../../SplashPageParts/login-create-container/LoginCreateContainer"
import { useAuthContext } from "../../../hooks/useAuthContext";

const SplashContainer = (props) => {

  const user = useAuthContext()

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