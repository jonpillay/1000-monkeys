import "./RateStoryPanel.css"

import { useState } from "react";

function RateStoryPanel(props) {

  const [currentRate, setCurrentRate] = useState(0)

  return (
    <div className="rate-story-panel-container">
      <div className="rate-story-grid">
        <div className="rate-count-container">
          {currentRate}
        </div>
        <div className="inc-arrows-container">
          <div className="inc-arrows-grid">
            <div className="inc-button-container">
              <button onClick={()=>{setCurrentRate(currentRate+1)}}>U</button>
            </div>
            <div className="inc-button-container">
            <button onClick={()=>{setCurrentRate(currentRate-1)}}>D</button>
            </div>
          </div>
        </div>
        <div className="vote-button-container">
          vote
        </div>
      </div>
    </div>
  )
}

export default RateStoryPanel;