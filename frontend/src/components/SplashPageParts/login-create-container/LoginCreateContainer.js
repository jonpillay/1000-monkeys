import { useAuthContext } from '../../../hooks/useAuthContext';

import "./LoginCreateContainer.css"

import LogInForm from '../login-form/LogInForm';
import StartYourStoryButton from '../../CreateSplashPageParts/start-your-story-button/StartYourStoryButton';
import BrowseNavButton from '../../BrowsePageParts/browse-nav-button/BrowseNavButton';


const LoginCreateContainer = () => {

  const {user} = useAuthContext()
  
  return (
    <>
      <div className="login-create-container">
        <div className='login-container'>
          {!user ? 
            <LogInForm /> :
            <StartYourStoryButton />
          }
        </div>
        <div className="or-container">
          OR
        </div>
        <div className='browse-button-container'>
          <BrowseNavButton/>
        </div>
      </div>
    </>
  )

}

export default LoginCreateContainer