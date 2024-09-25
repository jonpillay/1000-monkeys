import './RatingPanel.css'

import RateStoryPanel from '../rate-story-panel/RateStoryPanel'
import { useUpdateRating } from '../../hooks/useUpdateRating'
import { useEffect, useState } from 'react'

import { useAuthContext } from '../../hooks/useAuthContext'

function RatingPanel(props) {

  const { user } = useAuthContext()

  const bookID = props.bookID
  const authorID = props.authorID
  const ratingsDict = props.ratings

  // let ratedBool = false

  const [ratedBool, setRatedBool] = useState(false)

  const [ratings, setRatings] = useState(props.ratings)

  let rawRatings = []

  ratings.forEach((rating) => (rawRatings.push(Object.values(rating)[0])))

  let ratingTotal = 0

  rawRatings.forEach((rating) => ratingTotal += rating)

  const [rating, setRating] = useState(ratings.length > 0 ? Math.floor(ratingTotal/ratings.length) : 0)

  useEffect(() => {

    // ratedBool = ratings.some((rating) => rating.hasOwnProperty(user.id))
    ratings.forEach((rating) => user.id in rating ? setRatedBool(true) : setRatedBool(false))

    let ratingTotal = 0
    console.log("This be ratings from use effect")
    console.log(ratings)
    rawRatings.forEach((rating) => ratingTotal += rating)
    setRating(ratings.length > 0 ? Math.floor(ratingTotal/ratings.length) : 0)
  },[ratings])

  const { submitRating, isLoading, error } = useUpdateRating()

  return (
    <>
    <div className="rating-panel-container">
      <div className="rating-panel-grid">
        <div className="rating-container">
          { (ratings.length > 0 ?
            <div>{rating}</div>
            :
            "Rate!"
          )}
        </div>
        {( authorID != user.id ?
            ( ratedBool == false ?
              <div className="rate-verb-container">
                <RateStoryPanel submitRating={submitRating} bookID={bookID} setRated={setRatedBool} setRatings={setRatings}/>
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