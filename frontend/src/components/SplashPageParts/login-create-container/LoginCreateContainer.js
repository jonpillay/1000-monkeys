import "./LoginCreateContainer.css"
import { useEffect, useState } from "react";

import LogInForm from '../login-form/LogInForm';
import StartYourStoryButton from '../../CreateSplashPageParts/start-your-story-button/StartYourStoryButton';
import BrowseNavButton from '../../BrowsePageParts/browse-nav-button/BrowseNavButton';

import { useAuthContext } from '../../../hooks/useAuthContext';
import { useLogin } from '../../../hooks/useLogIn';
import { useLocation } from "react-router";

const LoginCreateContainer = () => {

  const location = useLocation()
  const {user} = useAuthContext()

  const { login, isLoading, error, setError } = useLogin()
  const [apiError, setApiError] = useState(location.state?.error)

  useEffect(() => {

    let timeoutId;

    timeoutId = setTimeout(() => {
        setError("");
        setApiError("");
      }, 2500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [error, apiError]);
  
  return (
    <>
      <div className="login-create-container">
        <div className='login-container'>
          {!user ? 
            <LogInForm login={login} isLoading={isLoading} error={error} setError={setError} setApiError={setApiError}/> :
            <StartYourStoryButton />
          }
        </div>
        <div className="or-container">
          OR
        </div>
        <div className='browse-button-container'>
          <BrowseNavButton/>
        </div>
        <div className="login-error-container">
          { error && <div className="login-error">{error}</div>}
          { apiError && <div className="login-error">{apiError}</div>}
        </div>
      </div>
    </>
  )
}

export default LoginCreateContainer