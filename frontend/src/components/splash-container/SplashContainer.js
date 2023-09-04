import "./SplashContainer.css";
import WelcomePanel from "../welcome-panel/WelcomePanel";
import FormContainer from "../form-container/FormContainer"
import { useNavigate } from "react-router";

const SplashContainer = (props) => {
  return (
    <>
    <div className="splash-container">
      <div className="splash-grid">
        <WelcomePanel/>
        <FormContainer  navigate={ useNavigate() }/>
      </div>
    </div>
    </>
  )
}

export default SplashContainer;