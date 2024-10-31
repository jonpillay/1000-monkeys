import { useState } from 'react';
import './LoadingText.css'

import MonkeySpinner from '../monkey-spinner/MonkeySpinner';

const LoadingText = () => {

  const [ellipsis, setEllipsis] = useState([])

  setTimeout(() => {
    if (ellipsis.length == 3) {
      setEllipsis([])
    } else {
      setEllipsis([...ellipsis, '.'])
    }
  }, 400);

  const ellipsisDots = ellipsis.map(dot => <li className='ellipsis-dot'>{dot}</li>)

  return (
    <div className='loading-text-container'>
      <MonkeySpinner/>
      <div>Loading<span className='ellipsis-list'>{ellipsisDots}</span></div>
    </div>
  )
}

export default LoadingText;