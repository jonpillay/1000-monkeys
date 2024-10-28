import "./StartYourStoryButton.css"

import { useNavigate } from 'react-router';

const StartYourStoryButton = () => {

  const navigate = useNavigate()

  const startStory = () => {

    navigate('/start-your-story')

  }

  return (
    <div className='create-nav-container'>
      <button className="submit-button" id="start-story-button" type="submit" onClick={startStory}>Start Your Own Story</button>
    </div>
  )
}

export default StartYourStoryButton