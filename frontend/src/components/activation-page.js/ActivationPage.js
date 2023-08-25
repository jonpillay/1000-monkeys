import "./ActivationPage.css";
import ActivationBlurb from "../activation-blurb/ActivationBlurb";
import ActivationSignupPanel from "../activation-signup-panel/ActivationSignupPanel";
import HomeButton from "../home-button/HomeButton";
import { useNavigate } from "react-router";

const ActivationPage = (props) => {
  return (
    <>
    <HomeButton/>
    <div className="activation-container">
      <div className="activation-grid">
        <ActivationBlurb/>
        <ActivationSignupPanel/>
      </div>
    </div>
    </>
  )
}

export default ActivationPage;