import { useEffect, useState } from 'react';
import './DurationCountdown.css';

const DurationCountdown = (props) => {

  console.log(props.duration)

  let initTime = props.duration

  const initSeconds = Math.floor(initTime/1000).toString()

  const [seconds, setSeconds] = useState(initSeconds.length < 2 ? "0".concat(initSeconds) : initSeconds )

  useEffect(() => {

    console.log("Did fire")

      const countdown = setInterval(() => {
        let time = initTime -= 1000

        if (time < 0) {
          return () => clearInterval(countdown)
        }

        const seconds = Math.floor(time/1000);

        setSeconds(seconds)
        
      }, 1000)

      return () => clearInterval(countdown)
  }, [])

  return (
    <div className='counter-container'>
      <div className='seconds'>{seconds}</div>
    </div>
  )
};

export default DurationCountdown;