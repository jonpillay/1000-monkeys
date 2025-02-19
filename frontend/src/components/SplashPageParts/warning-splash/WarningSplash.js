import './WarningSplash.css'

import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';

import useSound from 'use-sound';

import warningAudio from '../../../audio/1000m-WARNING.mp3'
import warningMonkey  from '../../../img/warning-monkey-cutout.png'
import magicWord from '../../../img/magic-word-cutout.gif'

import egg from '../../../img/egg.png'

import DurationCountdown from '../duration-countdown/DurationCountdown';
import WarningExitSpiel from '../WarningExitSpiel/WarningExitSpiel';

import { useDispatch } from 'react-redux';
import { resetWarnings } from '../../app/systemInfoSlice';

import { useLoadingContext } from '../../../hooks/useLoadingContext';

const WarningSplash = (props) => {

  const navigate = useNavigate()
  const reduxDispatch = useDispatch()

  const warnedState = props.warnedState
  const setWaggingFinger = props.setWaggingFinger

  const eggIntro = warnedState == "EASTEREGGACTIVATED" ? "You Found the Easter Egg!" : "You Were Warned!"

  const location = useLocation()

  const [ play, { duration, sound } ] = useSound(warningAudio)

  const [ countdownTime, setCountdownTime ] = useState('-')

  const [ eggActivated, setEggActivated ] = useState(false)

  const [ exitSpiel, setExitSpiel ] = useState(false)
  
  const { loadingDispatch } = useLoadingContext()

  const startTimers = () => {
    
    setCountdownTime(duration)

    setTimeout(() =>{
      setExitSpiel(true)
    }, duration)

    setTimeout(() =>{
      reduxDispatch(resetWarnings())
      setWaggingFinger(false)
      // navigate(location, { state: null, replace: true })
      loadingDispatch({type: 'LOADED'})
      navigate(location.pathname, { state: null, replace: true });
    }, duration+2000)
  }

  const giveWarningSpiel = () => {

    play()

    sound.once("play", () => {
      startTimers()
    })

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
      { !exitSpiel ? 
      <div className="warning-splash-container">
        <div className="warning-splash-grid">
          <div className="warning-splash-text-container">
            <div className="wagging-finger-container">
              <img src={magicWord} alt="" className='wagging-finger'/>
            </div>
            <div className="warning-splash-text">
              You were warned. With your constant toremnting of the workforce, acting up in the lunch hall, and complete disregard for the rules, the monkeys have become angered and uncontrolable.
              The lab is trashed - the experiment on its knees. Your key card will be collected before the end of the day.
            </div>
          </div>
          <div className="warning-splash-body-container">
            <div className="warning-splash-body-grid">
              <div className="angry-monkey-container">
                <img src={warningMonkey} alt=""/>
              </div>
              <div className="standby-countdown-container">
                <div className="standby-container">
                  Standby!
                </div>
                <div className="countdown-container">
                  <DurationCountdown duration={countdownTime}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      :
      <WarningExitSpiel warnedState={warnedState}/>
      }    
    </>
      :
      <div className="egg-splash-container">
        <div className="egg-intro-container">
          {eggIntro}
        </div>
        <div className="egg-container">
          <img className="egg" src={egg} alt="broken egg" onClick={eggClick}/>
        </div>
        <div className="click-egg-container">
          Click On The Egg To Continue!
        </div>
      </div>
    }
    </>
  )
}

export default WarningSplash;