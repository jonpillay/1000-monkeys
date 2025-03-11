import "./AcceptTermsForm.css";

import { useAcceptTerms } from "../../../hooks/useAcceptTerms";

const AcceptTermsForm = (props) => {

  const { acceptTerms, termsAccepted, setTermsAccepted, error } = useAcceptTerms()

  return (
    <>
      <div className='tou-form-container'>
        <div className='tou-checkbox-container'>
          <input
            type='checkbox'
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            className='you-check-box'
          />
          <div className='tou-form-instruction'>
            Please Tick The Box To Show You Have Understood Our Terms of Use and Check the Box to Accept Them.
          </div>
        </div>
        <button type='button' disabled={!termsAccepted}>Accept and Continue</button>
      </div>
    </>
  )
}

export default AcceptTermsForm;