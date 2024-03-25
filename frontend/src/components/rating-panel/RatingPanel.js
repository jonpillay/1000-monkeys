import './RatingPanel.css'

import RateStoryPanel from '../rate-story-panel/RateStoryPanel'
import { useUpdateRating } from '../../hooks/useUpdateRating'
import { useState } from 'react'

function RatingPanel(props) {

  const ratings = props.ratings
  const bookID = props.bookID

  let ratingTotal = 0

  if (ratings.length>0) {
    ratings.forEach((entry) => ratingTotal += entry.value)
  }

  const rating = ratings.length > 0 ? Math.floor((ratings.forEach((entry) => ratingTotal += entry.value
  )/ratings.length) * 2) / 2 : 4.5

  const [userRated, setUserRated ] = useState(false)

  const { submitRating, isLoading, error } = useUpdateRating()

  return (
    <>
    <div className="rating-panel-container">
      <div className="rating-panel-grid">
        <div className="rating-container">
          {( userRated ?
          <div> "it worked!" </div>
            :
            <div>{rating} </div>)}
        </div>
        <div className="rate-verb-container">
          <RateStoryPanel submitRating={submitRating} bookID={bookID} setUserRated={setUserRated}/>
        </div>
      </div>
    </div>
  </>
  )
}

export default RatingPanel;