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

  // let ratedBool = false

  const [ratedBool, setRatedBool] = useState(false)

  useEffect(() => {
    // ratedBool = ratings.some((rating) => rating.hasOwnProperty(user.id))
    ratings.forEach((rating) => user.id in rating ? setRatedBool(true) : setRatedBool(false))
    
  },[])

  let ratingStart = 0
  let ratingTotal = 0

  ratings.forEach((rating) => {ratingTotal += Object.values(rating)[0]})

  const rating = ratings.length > 0 ? Math.floor(ratingTotal/ratings.length) : "Rate!"

  console.log(rating)

  const { submitRating, isLoading, error } = useUpdateRating()

  return (
    <>
    <div className="rating-panel-container">
      <div className="rating-panel-grid">
        <div className="rating-container">
          <div>{rating}</div>
        </div>
        {( authorID != user.id ?
            ( ratedBool == false ?
              <div className="rate-verb-container">
                <RateStoryPanel submitRating={submitRating} bookID={bookID} setUserRated={setRatedBool}/>
              </div>
              :
              <div className="rate-verb-container">
                "Already Rated"
              </div>
            )
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