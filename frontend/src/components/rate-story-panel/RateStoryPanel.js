import "./RateStoryPanel.css"

function RateStoryPanel(props) {

  return (
    <div className="rate-story-panel-container">
      <div className="rate-story-grid">
        <div className="rate-count-container">
          5
        </div>
        <div className="inc-arrows-container">
          <div className="inc-arrows-grid">
            <div className="inc-button-container">
              u
            </div>
            <div className="inc-button-container">
              d
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