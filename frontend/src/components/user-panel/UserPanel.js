import './UserPanel.css'

import { useAuthContext } from '../../hooks/useAuthContext';
import { useEffect, useState } from 'react';

const UserPanel = () => {

  const {user} = useAuthContext()

  const [credits, setCredits] = useState(user ? user.credits : 0)

  return (
    <>
    {( user ? 

    <div className="user-panel-container">
      <div className="user-name-container">
        <span>{`Hi ${user.email}!`}</span>
      </div>
      <div>
        <div className='nut-count'>
          {`You have ${credits}`}
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