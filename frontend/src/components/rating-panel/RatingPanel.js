import './RatingPanel.css'

import RateStoryPanel from '../rate-story-panel/RateStoryPanel'

function RatingPanel(props) {

  const ratings = props.ratings

  const rating = ratings.length > 0 ? Math.floor((rating/rating.length) * 2) / 2 : 4.5

  return (
    <div className="rating-panel-container">
      <div className="rating-panel-grid">
        <div className="rating-container">
          {rating}
        </div>
        <div className="rate-verb-container">
          <RateStoryPanel/>
        </div>
      </div>
    </div>
  )
}

export default RatingPanel;