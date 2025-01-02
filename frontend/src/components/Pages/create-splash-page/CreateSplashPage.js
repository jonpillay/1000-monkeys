import "./CreateSplashPage.css";
import CreateSplashIntro from '../../CreateSplashPageParts/create-splash-intro/CreateSplashIntro'
import InitialiseStoryForm from "../../CreateSplashPageParts/initialise-story-form/InitialiseStoryForm"
import { useNavigate } from "react-router";

const CreateSplashPage = (props) => {

  const { AIGenCall } = props

  return (
    <>
    <div className="splash-container">
      <div className="splash-grid">
        <CreateSplashIntro/>
        <InitialiseStoryForm/>
      </div>
    </div>
    </>
  )
}

export default CreateSplashPage;