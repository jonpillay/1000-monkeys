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
  const initialRatingsAverage = props.ratingsAverage

  // let ratedBool = false

  const [ratings, setRatings] = useState(props.ratings ? props.rating : [])

  const [ratedBool, setRatedBool] = useState(!ratings || !user ? false : user.id in ratings ? true : false)

  const [ userRating, setUserRating ] = useState(!ratings || !user ? 0 : user.id in ratings ? ratings[user.id] : 0)

  const [ ratingsAverage, setRatingsAverage ] = useState(initialRatingsAverage.length > 0 ? initialRatingsAverage : [])


  const { submitRating, isLoading, error } = useUpdateRating()

  return (
    <>
    <div className="rating-panel-container">
      <div className="rating-panel-grid">
        <div className="rating-container">
          { (ratingsAverage.length > 0 ?
          <>
            <div className='rating-span'>{ratingsAverage[0]}<span><img className='rating-star' src={RatingStar}/></span><span style={{fontSize:18}}>({ratingsAverage[1]})</span></div>
          </>
            :
            <div className='needs-rating-span'>Awaiting Rating!</div>
          )}
        </div>
        {(user != null ?
          ( authorID != user.id ?
            ( ratedBool == false ?
              <div className='rating-control-container'>
                <RateStoryPanel submitRating={submitRating} bookID={bookID} setRatedBool={setRatedBool} setRatingsAverage={setRatingsAverage} setUserRating={setUserRating}/>
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