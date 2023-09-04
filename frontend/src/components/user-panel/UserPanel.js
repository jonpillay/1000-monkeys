import './UserPanel.css'

import { useAuthContext } from '../../hooks/useAuthContext';

const UserPanel = () => {

  const {user} = useAuthContext()

  console.log(user)

  return (
    <>
    {( user ? 

    <div className="user-panel-container">
      <div className="user-name-container">
        <span>{`Hi ${user.email}!`}</span>
      </div>
      <div>
        <div className='nut-count'>
          {`You have ${user.credits}`}
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