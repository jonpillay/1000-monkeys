import './JustPublishedInfo.css'

import { useNavigate } from 'react-router'

const JustPublishedInfo = () => {

  const navigate = useNavigate()

  const handleBrowseNav = (e) => {

    e.preventDefault()

    navigate('/browse')

  }

  return (
    <div className='just-published-info-container'>
      <div className='just-published-text'>Well Done, You're Published!</div>
      <div className='just-published-text' id='just-published-text-sub'>Head Over to the <span className='published-browse-link' onClick={handleBrowseNav}>Browse Page</span> To See How It Gets Rated.</div>
    </div>
    
  )
}

export default JustPublishedInfo