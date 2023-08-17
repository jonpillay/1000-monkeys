import "./ActivationPage.css";
import ActivationBlurb from "../activation-blurb/ActivationBlurb";
import ActivationForm from "../activation-form/ActivationForm";
import HomeButton from "../home-button/HomeButton";
import { useNavigate } from "react-router";

const ActivationPanel = (props) => {
  return (
    <>
    <HomeButton/>
    <div className="activation-container">
      <div className="activation-grid">
        <ActivationBlurb/>
        <ActivationForm/>
      </div>
    </div>
    </>
  )
}

export default ActivationPanel;