import { useState } from 'react';
import './CreateButton.css'

const CreateButton = (props) => {
  const createFunct = props.createFunct;
  const value = props.value;

  const disabledVar = props.disabledVar

  const selectedButton = props.selectedButton

  const [buttonHover, setButtonHover] = useState(false)

  const clickTest = () => {
    console.log("Foofy here")
  }

  return (
    <div className='create-button-container'>
      <button onMouseEnter={() => setButtonHover(true)} onMouseLeave={() => setButtonHover(false)} onClick={clickTest} className={selectedButton == value ? "create-button selected" : buttonHover ? "create-button hover" : "create-button"} disabled={disabledVar}>{value}</button>
    </div>
  )
}

export default CreateButton;