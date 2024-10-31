import './StoryControlPanel.css'

import { useAuthContext } from '../../../hooks/useAuthContext';
import { useCreditsContext } from '../../../hooks/useCreditsContext';

import { useEffect, useState } from 'react';

const StoryControlPanel = (props) => {

  const refreshStory = props.refreshStory
  const refreshImage = props.refreshImage
  const whatHappensNext = props.whatHappensNext

  return (
    <div className="resultpage-button-container">
      <div>
        <button className="resultpage-button" data-cy="refresh" onClick={refreshStory}>Refresh the story</button>
      </div>
      <div>
        <button className="resultpage-button" data-cy="next" onClick={whatHappensNext}>What happens next?</button>
      </div>
      <div>
        <button className="resultpage-button" data-cy="next" onClick={refreshImage}>Refresh Image</button>
      </div>
    </div>
  )
}

export default StoryControlPanel