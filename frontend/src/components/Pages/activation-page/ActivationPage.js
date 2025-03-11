import "./ActivationPage.css";
import ActivationBlurb from "../../ActivationPageParts/activation-blurb/ActivationBlurb";
import TermsOfUseText from "../../ActivationPageParts/terms-of-use-signup-panel/TermsOfUseSignUpPanel";
import ActivationForm from "../../ActivationPageParts/activation-form/ActivationForm"
import SignupForm from "../../ActivationPageParts/signup-form/SignupForm"

import { useActivate } from "../../../hooks/useActivate";


const ActivationPage = () => {

  const { activate, isLoading, error, signupActive } = useActivate()
  
  return (
    <>
    <div className="activation-container">
      {(
        !true ?
          <div className="activation-grid">
            <ActivationBlurb/>
            <ActivationForm/>
          </div>
        :
        <div className="activation-grid">
          <TermsOfUseText/>
          <SignupForm/>
        </div>
      )}
      </div>
    </>
  )
}

export default ActivationPage;

// {(
//   !signupActive ?
//   <ActivationBlurb/>
//   :
//   <TermsOfUseText/>
// )}
// <TermsOfUseText/>
// <div className="activation-signup-panel">
//   {(!signupActive ? 
//   <ActivationForm activate={activate} isLoading={isLoading} error={error} signupActive={signupActive}/>
//   :
//   <SignupForm signupActive={signupActive}/>
// )}