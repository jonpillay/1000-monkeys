import "./CreateSplashPage.css";
import CreateSplashIntro from '../../CreateSplashPageParts/create-splash-intro/CreateSplashIntro'
import InitialiseStoryForm from "../../CreateSplashPageParts/initialise-story-form/InitialiseStoryForm"
import { selectAllWarnings, resetWarnings } from "../../app/systemInfoSlice";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

const CreateSplashPage = (props) => {

  const warnings = useSelector(selectAllWarnings)
  const reduxDispatch = useDispatch()

  const [ waggingFinger, setWaggingFinger ] = useState(false)

  useEffect(() => {

    if (warnings == 5) {

      reduxDispatch(resetWarnings())

      setWaggingFinger(true)

      let timeoutId;

      timeoutId = setTimeout(() => {
          setWaggingFinger(false)
        }, 2000);

    }

  }, [warnings])

  return (
    <>
    <div className="splash-container">
      <div className="splash-grid">
        { !waggingFinger ? (
          <>
            <CreateSplashIntro/>
            <InitialiseStoryForm/>          
          </>
          ) : (
            "BOOP"
          )    
        }
      </div>
    </div>
    </>
  )
}

export default CreateSplashPage;