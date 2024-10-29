import "./ActivationPage.css";
import ActivationBlurb from "../../activation-blurb/ActivationBlurb";
import ActivationSignupPanel from "../../activation-signup-panel/ActivationSignupPanel";
import HomeButton from "../../header/Header";
import { useNavigate } from "react-router";

const ActivationPage = (props) => {
  return (
    <>
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