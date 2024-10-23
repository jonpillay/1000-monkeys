import "./SplashContainer.css";
import WelcomePanel from "../welcome-panel/WelcomePanel";
import LogInForm from "../login-form/LogInForm";
import LoginCreateContainer from "../login-create-container/LoginCreateContainer"
import { useNavigate } from "react-router";
import { useAuthContext } from "../../hooks/useAuthContext";

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