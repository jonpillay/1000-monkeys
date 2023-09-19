import { useState } from 'react';
import './LoadingText.css'

const LoadingText = () => {

  const [ellipsis, setEllipsis] = useState([])

  setTimeout(() => {
    if (ellipsis.length == 3) {
      setEllipsis([])
    } else {
      setEllipsis([...ellipsis, '.'])
      console.log(ellipsis)
    }
  }, 400);

  const ellipsisDots = ellipsis.map(dot => <li className='ellipsis-dot'>{dot}</li>)

  return (
    <div className='loading-text-container'>
      <div>Loading<span className='ellipsis-list'>{ellipsisDots}</span></div>
    </div>
  )
}

export default LoadingText;