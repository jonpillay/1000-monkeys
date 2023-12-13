import { useEffect, useState } from 'react';
import './FetchButton.css'

const FetchButton = (props) => {
  const fetchFunct = props.fetchFunct;
  const font = props.font
  const value = props.value;

  const selectedButton = props.selectedButton

  const [buttonHover, setButtonHover] = useState(false)

  // useEffect(() => {
  //   const controlButtonHover = () => {
  //     if (onmouseenter) {
  //       setButtonHover(true)
  //     } if (onmouseleave) {
  //       setButtonHover(false)
  //     }
  //   }

  //   document.addEventListener('mousemove', controlButtonHover);
  // })

  return (
    <div className='fetch-button-container'>
      <button onMouseEnter={() => setButtonHover(true)} onMouseLeave={() => setButtonHover(false)} onClick={fetchFunct} style={{fontFamily: font}} className={selectedButton == value ? "fetch-button selected" : buttonHover ? "fetch-button hover" : "fetch-button"}>{value}</button>
    </div>
  )
}

export default FetchButton;