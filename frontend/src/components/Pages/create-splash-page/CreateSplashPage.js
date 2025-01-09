import "./CreateSplashPage.css";
import CreateSplashIntro from '../../CreateSplashPageParts/create-splash-intro/CreateSplashIntro'
import InitialiseStoryForm from "../../CreateSplashPageParts/initialise-story-form/InitialiseStoryForm"
import { selectAllWarnings, resetWarnings } from "../../app/systemInfoSlice";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

const CreateSplashPage = (props) => {

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