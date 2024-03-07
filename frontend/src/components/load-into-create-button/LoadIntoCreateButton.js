import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useLoadIntoCreate } from '../../hooks/useLoadIntoCreate';
import './LoadIntoCreateButton.css'

const LoadIntoCreateButton = (props) => {
  const storyID = props.storyID
  const { loadIntoCreateHook } = useLoadIntoCreate()
  const navigate = useNavigate()

  const selectedButton = props.selectedButton

  const [buttonHover, setButtonHover] = useState(false)

  const handleClick = async () => {
    await loadIntoCreateHook(storyID)
    navigate('../create')
  }

  return (
    <div className='load-into-create-button-container'>
      <button onMouseEnter={() => setButtonHover(true)} onMouseLeave={() => setButtonHover(false)} onClick={() => handleClick()} className={buttonHover ? "load-into-create-button hover" : "load-into-create-button"}>Edit</button>
    </div>
  )
}

export default LoadIntoCreateButton;