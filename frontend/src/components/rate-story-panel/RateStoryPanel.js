import "./RateStoryPanel.css"

import AnimatedNumbers from "react-animated-numbers";

import { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";

function RateStoryPanel(props) {

  const { user } = useAuthContext() 

  const [currentRate, setCurrentRate] = useState(0)

  const submitRating = props.submitRating
  const bookID = props.bookID
  const setUserRated = props.setRated
  const setRatings = props.setRatings

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await submitRating(bookID, currentRate)
      console.log(currentRate)
      setRatings((prevRatings) => [...prevRatings, {[user.id]: currentRate}])
      setUserRated(true)
    } catch(error) {
      console.log(error)
    }

  }

  return (
  <div className="rate-story-panel-container">
    <div className="rate-story-grid">
      <div className="rate-count-container">
        <AnimatedNumbers
          includeComma
          className={'rating-ticker'}
          transitions={(index) => ({
            type: "spring",
            duration: index + 0.09,
          })}
          animateToNumber={currentRate}
          fontStyle={{
            fontSize: 40,
            color: "black",
          }}
        />
      </div>
      <div className="inc-arrows-container">
        <div className="inc-arrows-grid">
          <div className="inc-button-container">
            <button disabled={currentRate>=5} onClick={()=>{setCurrentRate((state) => state + 1 )}}>U</button>
          </div>
          <div className="inc-button-container">
            <button disabled={currentRate<=0} onClick={()=>{setCurrentRate((state) => state - 1 )}}>D</button>
          </div>
        </div>
      </div>
      <div className="vote-button-container">
        <button onClick={handleSubmit}>Rate</button>
      </div>
    </div>
  </div>
  )
}

export default RateStoryPanel;