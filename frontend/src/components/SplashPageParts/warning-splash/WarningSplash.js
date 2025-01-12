import './WarningSplash.css'

import { useState, useEffect } from 'react';

import useSound from 'use-sound';

import warningAudio from '../../../audio/1000m-WARNING.mp3'
import warningMonkey  from '../../../img/warning-monkey-cutout.png'
import magicWord from '../../../img/magic-word-cutout.gif'

import egg from '../../../img/egg.png'

import DurationCountdown from '../duration-countdown/DurationCountdown';

const WarningSplash = () => {

  useEffect(() => {

  }, [])

  const [ play, { duration, sound } ] = useSound(warningAudio)

  const [ countdownTime, setCountdownTime ] = useState()

  const [ eggActivated, setEggActivated ] = useState(false)

  const [ exitSpiel, setExitSpiel ] = useState(false)

  const startTimers = () => {

    setCountdownTime(duration)

    setTimeout(() =>{
      setExitSpiel(true)
    }, duration)
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