import React, { useEffect, useState } from 'react';
import './Counter.css';

const Counter = (props) => {
  console.log("Coutner rerendered")

  

  const [minutes, setMinutes] = useState()

  const [seconds, setSeconds] = useState()

  useEffect(() =>{

    const endTime = parseInt(localStorage.getItem("activateEndtime"))

    if (!endTime) {
      setSeconds('00')
      setMinutes('00')
    } else {
      const countdown = setInterval(() => {
        const time = endTime - Date.now()
        const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((time % (1000 * 60)) / 1000);
        setMinutes(minutes)
        setSeconds(seconds)
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