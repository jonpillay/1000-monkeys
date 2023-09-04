import "./InviteActivation.css";
import InviteWelcomePanel from "../invite-welcome/InviteWelcome";
import InviteForm from "../invite-form/FormContainer"
import { useNavigate } from "react-router";

const InviteActivation = (props) => {
  return (
    <>
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