import './RatingPanel.css'

function RatingPanel(props) {

  const ratings = props.ratings

  const rating = rating.length > 0 ? Math.floor((rating/rating.length) * 2) / 2 : 0

  return (
    <div className="rating-panel-container">
      <div className="rating-panel-grid">
        <div className="rating-container">

        </div>
        <div className="rate-verb-container">

        </div>
      </div>
    </div>
  )
}

export default RatingPanel;