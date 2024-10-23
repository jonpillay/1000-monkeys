import { useAuthContext } from '../../hooks/useAuthContext';

import "./LoginCreateContainer.css"

import LogInForm from '../login-form/LogInForm';
import StartYourStoryButton from '../start-your-story-button/StartYourStoryButton';


const LoginCreateContainer = () => {

  const {user} = useAuthContext()
  
  return (
    <>
    {!user ? 
     <LogInForm/> :
     <StartYourStoryButton/>
     }
    </>
  )

}

export default LoginCreateContainer