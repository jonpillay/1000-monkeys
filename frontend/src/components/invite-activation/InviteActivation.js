import "./InviteActivation.css";
import InviteWelcomePanel from "../invite-welcome/InviteWelcome";
import InviteForm from "../invite-form/FormContainer"
import HomeButton from "../home-button/HomeButton";
import { useNavigate } from "react-router";

const InviteActivation = (props) => {
  return (
    <>
    <HomeButton/>
    <div className="invite-container">
      <div className="invite-grid">
        <InviteWelcomePanel/>
        <InviteForm/>
      </div>
    </div>
    </>
  )
}

export default InviteActivation;