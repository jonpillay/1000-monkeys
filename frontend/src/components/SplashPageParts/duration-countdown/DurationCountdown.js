import { useEffect, useState } from 'react';
import './DurationCountdown.css';

const DurationCountdown = (props) => {

  let durationMillis = props.duration

  const initSeconds = Math.floor(durationMillis/1000)

  const [seconds, setSeconds] = useState("")

  useEffect(() => {

    console.log("Did fire")

    setSeconds(initSeconds)

    const countdown = setInterval(() => {

      console.log(durationMillis)
      let time = durationMillis -= 1000
      

      if (time < 0) {
        return () => clearInterval(countdown)
      }

      const seconds = Math.floor(time/1000);

      console.log(seconds)
      setSeconds(seconds)
      
    }, 1000)

      return () => clearInterval(countdown)
  }, [durationMillis])

  return (
    <div className='counter-container'>
      <div className='seconds'>{seconds}</div>
    </div>
  )
};

export default DurationCountdown;