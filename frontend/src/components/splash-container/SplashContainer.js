import "./SplashContainer.css";
import FormContainer from "../form-container/FormContainer"
import HomeButton from "../home-button/HomeButton";
import { useNavigate } from "react-router";

const SplashContainer = (props) => {
  return (
    <>
    <HomeButton/>
    <div className="splash-container">
      <div className="splash-grid">
        <FormContainer  navigate={ useNavigate() }/>
        <div className="welcome-text-container">
          Blah, blah, random 'please hold' text
        </div>
      </div>
    </div>
    </>
  )
}

export default SplashContainer;