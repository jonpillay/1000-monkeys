import { useEffect, useState, useRef } from 'react';
import './FetchButton.css'

import { useLocation } from 'react-router';

const FetchButton = (props) => {

  const fetchFunct = props.fetchFunct;
  const font = props.font
  const value = props.value;
  const selectedButton = props.selectedButton

  const [buttonHover, setButtonHover] = useState(false)

  const refs = {}
  refs[value] = useRef()

  const location = useLocation

  useEffect(() => {
    if (location.state?.justPublished) {

      refs["My Stories"].current.click()

    }
  }, [])

  return (
    <div className='fetch-button-container'>
      <button ref={refs.value} onMouseEnter={() => setButtonHover(true)} onMouseLeave={() => setButtonHover(false)} onClick={fetchFunct} style={{fontFamily: font}} className={selectedButton == value ? "fetch-button selected" : buttonHover ? "fetch-button hover" : "fetch-button"}>{value}</button>
    </div>
  )
}

export default FetchButton;