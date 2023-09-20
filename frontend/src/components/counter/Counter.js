import React, { useEffect, useState } from 'react';
import './Counter.css';

const Counter = (props) => {

  const endTime = parseInt(localStorage.getItem('activateEndtime'))

  const initTime = endTime - Date.now()

  const [minutes, setMinutes] = useState(Math.floor((initTime % (1000 * 60 * 60)) / (1000 * 60)))

  const [seconds, setSeconds] = useState(Math.floor((initTime % (1000 * 60)) / 1000))

  useEffect(() =>{

    if (!endTime) {
      setSeconds('00')
      setMinutes('00')
    } else {
      const countdown = setInterval(() => {
        const time = endTime - Date.now()
        const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((time % (1000 * 60)) / 1000);

        if (minutes < 10) {
          setMinutes("0" + minutes.toString())
        } else {
          setMinutes(minutes)
        }

        if (seconds < 10) {
          setSeconds("0" + seconds.toString())
        } else {
          setSeconds(seconds)
        }
        
      }, 1000)

      return () => clearInterval(countdown)
    }
  }, [])

  return (
    <div className='counter-container'>
      <div className='minutes'>{minutes}</div>
      <div className='colon'>:</div>
      <div className='seconds'>{seconds}</div>
    </div>
  )
};

export default Counter;