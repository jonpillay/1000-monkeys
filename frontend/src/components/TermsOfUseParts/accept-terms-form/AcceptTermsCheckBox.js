import "./AcceptTermsCheckBox.css";

import { useAcceptTerms } from "../../../hooks/useAcceptTerms";

const AcceptTermsCheckBox = (props) => {

  const termsScrolled = props.termsScrolled
  const termsAccepted = props.termsAccepted
  const setTermsAccepted = props.setTermsAccepted

  return (
    <>
      <div className='tou-checkbox-container'>
        <input
          type='checkbox'
          checked={termsAccepted}
          onChange={(e) => setTermsAccepted(e.target.checked)}
          className='you-check-box'
          disabled={!termsScrolled}
        />
        <div className='tou-form-instruction'>
          Please Tick The Box To Show You Have Understood And Agree To Abide By Our Terms Of Use.
        </div>
      </div>
    </>
  )
}

export default AcceptTermsCheckBox;