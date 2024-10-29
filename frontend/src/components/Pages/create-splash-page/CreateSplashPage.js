import "./CreateSplashPage.css";
import CreateSplashIntro from '../../create-splash-intro/CreateSplashIntro'
import FormContainer from "../../form-container/FormContainer"
import { useNavigate } from "react-router";

const CreateSplashPage = (props) => {

  const { AIGenCall } = props

  return (
    <>
    <div className="splash-container">
      <div className="splash-grid">
        <CreateSplashIntro/>
        <FormContainer/>
      </div>
    </div>
    </>
  )
}

export default CreateSplashPage;