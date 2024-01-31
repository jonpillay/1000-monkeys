import { useState } from 'react';
import './CreateButton.css'

const CreateButton = (props) => {
  const createFunct = props.createFunct;
  const value = props.value;

  const selectedButton = props.selectedButton

  const [buttonHover, setButtonHover] = useState(false)

  return (
    <div className='create-button-container'>
      <button onMouseEnter={() => setButtonHover(true)} onMouseLeave={() => setButtonHover(false)} onClick={createFunct} className={selectedButton == value ? "create-button selected" : buttonHover ? "create-button hover" : "create-button"}>{value}</button>
    </div>
  )
}

export default CreateButton;