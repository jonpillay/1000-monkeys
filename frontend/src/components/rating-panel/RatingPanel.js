import './RatingPanel.css'

import RateStoryPanel from '../rate-story-panel/RateStoryPanel'
import { useUpdateRating } from '../../hooks/useUpdateRating'
import { useState } from 'react'

function RatingPanel(props) {

  const ratings = props.ratings
  const bookID = props.bookID

  const rating = ratings.length > 0 ? Math.floor((rating/rating.length) * 2) / 2 : 4.5

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
          <RateStoryPanel submitRating={submitRating} bookID={bookID}/>
        </div>
      </div>
    </div>
  </>
  )
}

export default RatingPanel;