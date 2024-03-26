import './RatingPanel.css'

import RateStoryPanel from '../rate-story-panel/RateStoryPanel'
import { useUpdateRating } from '../../hooks/useUpdateRating'
import { useEffect, useState } from 'react'

import { useAuthContext } from '../../hooks/useAuthContext'

function RatingPanel(props) {

  const { user } = useAuthContext()

  const ratings = props.ratings
  const bookID = props.bookID
  const authorID = props.authorID

  let ratedBool = false

  useEffect(() => {
    ratedBool = ratings.some((rating) => rating.hasOwnProperty(user.id))
  }, [])

  let ratingTotal = 0

  if (ratings.length>0) {
    ratings.forEach((ratingEntry) => ratingTotal += Object.values(ratingEntry))
  }

  const rating = ratings.length > 0 ? Math.floor((
  ratingTotal/ratings.length) * 2) / 2 : 4.5

  const [userRated, setUserRated ] = useState(ratedBool)

  const { submitRating, isLoading, error } = useUpdateRating()

  return (
    <>
    <div className="rating-panel-container">
      <div className="rating-panel-grid">
        <div className="rating-container">
          <div>{rating}</div>
        </div>
        {( authorID != user.id ? 
          <div className="rate-verb-container">
            <RateStoryPanel submitRating={submitRating} bookID={bookID} setUserRated={setUserRated}/>
          </div>
          :
          <div className="rate-verb-container">
            own story
          </div>
        )}
      </div>
    </div>
  </>
  )
}

export default RatingPanel;