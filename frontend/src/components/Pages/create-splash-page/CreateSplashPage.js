import "./CreateSplashPage.css";
import CreateSplashIntro from '../../CreateSplashPageParts/create-splash-intro/CreateSplashIntro'
import InitialiseStoryForm from "../../CreateSplashPageParts/initialise-story-form/InitialiseStoryForm"
import { selectAllWarnings, resetWarnings } from "../../app/systemInfoSlice";
import { useEffect, useState } from "react";

import { Tooltip } from 'react-tooltip'

import { useDispatch, useSelector } from "react-redux";

import egg from '../../../img/egg.png'


const CreateSplashPage = (props) => {

  return (
    <>
    <div className="splash-container">
      <div className="splash-grid">
        <CreateSplashIntro/>
        <InitialiseStoryForm/>
      </div>
      <div className="splash-egg-container">
        <Tooltip id="splash-egg-tooltip" />
        <a href="https://github.com/jonpillay/AI-tistic-Tales-JP-Remix/blob/main/frontend/src/hooks/useCheckEggInput.js" target="_blank" rel="noopener noreferrer" data-tooltip-id="splash-egg-tooltip" data-tooltip-content="6-20">
          <img className="splash-egg" src={egg}/> 
        </a>
      </div>
    </div>
    </>
  )
}

export default CreateSplashPage;