import './WarningSplash.css'

import { useState, useEffect } from 'react';

import useSound from 'use-sound';
import warningAudio from '../../../audio/1000m-WARNING.mp3'

import egg from '../../../img/egg.png'

const WarningSplash = () => {

  const [ play, exposedData ] = useSound(warningAudio)

  const [ eggActivated, setEggActivated ] = useState(false)

  const [ exitSpiel, setExitSpiel ] = useState(false)

  // useEffect(() => {

  //   console.log("useEffect in WarningSplashFired")

  //   window.addEventListener("load", (event) => {play()});
  // }, [])

  const giveWarningSpiel = () => {

    play()

    setTimeout(() =>{
      setExitSpiel(true)
    }, exposedData['duration'])

  }

  const eggClick = (e) => {

    e.preventDefault()

    setEggActivated(true)

    giveWarningSpiel()
  }

  return (
    <>
    { eggActivated ?
    <>
      {!exitSpiel ? 
        <div className="warning-splash-container">
        <div className="warning-splash-grid">
          <div className="warning-splash-body">

          </div>
          <div className="warning-splash-text">
  
          </div>
        </div>
      </div>
      :
      <div className="test-div">"pass"</div>
      }    
    </>
      :
      <div className="egg-container">
        <img className="egg" src={egg} alt="broken egg" onClick={eggClick}/>
      </div>
    }
    </>

  )
}

export default WarningSplash;