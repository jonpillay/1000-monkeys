import "./SplashContainer.css";
import WelcomePanel from "../welcome-panel/WelcomePanel";
import LogInForm from "../login-form/LogInForm";
import FormContainer from "../form-container/FormContainer";
import { useNavigate } from "react-router";
import { useAuthContext } from "../../hooks/useAuthContext";

const SplashContainer = (props) => {

  const user = useAuthContext()

  return (
    <>
    <div className="splash-container">
      <div className="splash-grid">
        <WelcomePanel/>
        { user? 
        <FormContainer/> : 
        <LogInForm/>
        }

      </div>
    </div>
    </>
  )
}

export default SplashContainer;