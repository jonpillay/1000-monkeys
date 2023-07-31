import "./SplashContainer.css";
import WelcomePanel from "../welcome-panel/WelcomePanel";
import FormContainer from "../form-container/FormContainer"
import HomeButton from "../home-button/HomeButton";
import { useNavigate } from "react-router";

const SplashContainer = (props) => {
  return (
    <>
    <HomeButton/>
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