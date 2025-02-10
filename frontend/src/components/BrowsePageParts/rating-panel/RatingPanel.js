import './RatingPanel.css'

import RateStoryPanel from '../rate-story-panel/RateStoryPanel'
import { useUpdateRating } from '../../../hooks/useUpdateRating'
import { useEffect, useState } from 'react'

import { useAuthContext } from '../../../hooks/useAuthContext'

import RatingStar from "../../../img/star.svg"

function RatingPanel(props) {

  const { user } = useAuthContext()

  const bookID = props.bookID
  const authorID = props.authorID
  const ratingsIDs = props.ratings

  // let ratedBool = false

  const [ratedBool, setRatedBool] = useState(false)

  const [ratings, setRatings] = useState(props.ratings)

  let rawRatings = []

  ratings.forEach((rating) => (rawRatings.push(Object.values(rating)[0])))

  let ratingTotal = 0

  rawRatings.forEach((rating) => ratingTotal += rating)

  const [rating, setRating] = useState(ratings.length > 0 ? Math.floor(ratingTotal/ratings.length) : 0)

  let userRating = null

  for (const rating of ratings) {
    if (user == null || user.id in rating) {
      userRating = Object.values(rating)[0]
    }
  }



  useEffect(() => {

    // ratedBool = ratings.some((rating) => rating.hasOwnProperty(user.id))
    if (user != null) {
      ratings.forEach((rating) => user.id in rating ? setRatedBool(true) : setRatedBool(false))
    }

    let ratingTotal = 0

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
          <>
            <div className='rating-span'>{rating}<span><img className='rating-star' src={RatingStar}/></span><span style={{fontSize:18}}>({ratings.length} Ratings)</span></div>
          </>
            :
            <div className='needs-rating-span'>Awaiting Rating!</div>
          )}
        </div>
        {(user != null ?
          ( user != null && authorID != user.id ?
            ( ratedBool == false ?
              <div className='rating-control-container'>
                <RateStoryPanel submitRating={submitRating} bookID={bookID} setRated={setRatedBool} setRatings={setRatings}/>
              </div>
              :
              <div className="rate-verb-container">
                <div className='your-rating'>You Rated {userRating}<span><img className='rating-star' src={RatingStar}/></span></div>
              </div>
            )
          :
          <div className="your-story-container">
            Your Story
          </div>
          )
          :
          (
          <div className="your-story-container">
            Log In To Rate
          </div> 
          )

        )}
        
      </div>
    </div>
  </>
  )
}

export default RatingPanel;