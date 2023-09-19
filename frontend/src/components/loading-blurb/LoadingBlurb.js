import './LoadingBlurb.css'

import LLM_Blurb_List from './LLM_text';

const blurb = LLM_Blurb_List[Math.floor(Math.random() * LLM_Blurb_List.length)]

const LoadingBlurb = () => {
  return (
    <div className="loading-blurb-container">
      <div className='loading-llm-text'>
        <span>"</span>{blurb}<span>"</span>
      </div>
      <div className='author-container'>
        Random Wiki User
      </div>
    </div>
  )
}

export default LoadingBlurb;