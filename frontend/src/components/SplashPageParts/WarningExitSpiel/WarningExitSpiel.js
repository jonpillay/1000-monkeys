import './WarningExitSpiel.css'

import { useState, useEffect } from 'react'

const WarningExitSpiel = (props) => {

  const warnedState = props.warnedState

  const lineOne = warnedState == "EASTEREGGACTIVATED" ? "Well done for finding the Easter Egg": "Your Account Has Been Suspended."
  const lineTwo = warnedState == "EASTEREGGACTIVATED" ? "You will be returned to the homepage": "Please Contact Admin"
  

  return (

    <div className="warning-exit-spiel-container">

      <div className="warning-exit-line">
        {lineOne}
      </div>
      <div className="warning-exit-line">
        {lineTwo}
      </div>

    </div>

  )

}

export default WarningExitSpiel