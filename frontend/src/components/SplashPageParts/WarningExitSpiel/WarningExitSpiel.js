import './WarningExitSpiel.css'

import { useState, useEffect } from 'react'

const WarningExitSpiel = () => {

  const [ lineTwo, setLineTwo ] = useState("Please Contact Admin")

  useEffect(() => {

  }, [])

  return (

    <div className="warning-exit-spiel-container">

      <div className="warning-exit-line">
        Your Account Has Been Suspended.
      </div>
      <div className="warning-exit-line">
        {lineTwo}
      </div>

    </div>

  )

}

export default WarningExitSpiel