import { useEffect, useState } from 'react';
import './SortButton.css'

const SortButton = (props) => {
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
    <div className='sort-button-container'>
      <button onMouseEnter={() => setButtonHover(true)} onMouseLeave={() => setButtonHover(false)} onClick={fetchFunct} style={{fontFamily: font}} className={selectedButton == value ? "sort-button selected" : buttonHover ? "sort-button hover" : "sort-button"}>{value}</button>
    </div>
  )
}

export default SortButton;