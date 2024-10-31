import './UserPanel.css'

import { useAuthContext } from '../../../hooks/useAuthContext';
import { useCreditsContext } from '../../../hooks/useCreditsContext';

import { useEffect, useState } from 'react';

const UserPanel = () => {

  const {user} = useAuthContext()

  const {credits} = useCreditsContext()

  const [displayCredits, setDisplayCredits] = useState(credits)

  useEffect(() => {
    setDisplayCredits(credits)
  }, [credits]);

  return (
    <>
    {( user ? 

    <div className="user-panel-container">
      <div className="user-name-container">
        <span>{`Hi ${user.email}!`}</span>
      </div>
      <div>
        <div className='nut-count'>
          {`You have ${displayCredits}`}
        </div>
      </div>
    </div>
 :
    <div className="user-panel-container"></div>
       )}
    </>

  )
}

export default UserPanel