import "./AcceptTermsCheckBox.css";
import { Tooltip } from "react-tooltip";

import { useEffect } from "react";

const AcceptTermsCheckBox = (props) => {

  const termsScrolled = props.termsScrolled
  const termsAccepted = props.termsAccepted
  const setTermsAccepted = props.setTermsAccepted

  useEffect(()=> {
    setTermsAccepted(false)
  }, [])

  return (
    <>
      <div className='tou-checkbox-container'>
        {!termsScrolled ? <Tooltip id="tou-checkbox-tooltip"/> : <div></div>}
        <input
          type='checkbox'
          checked={termsAccepted}
          onChange={(e) => setTermsAccepted(e.target.checked)}
          className='you-check-box'
          disabled={!termsScrolled}
          data-tooltip-id="tou-checkbox-tooltip"
          data-tooltip-content="Please Read Terms"
        />
        <div className='tou-form-instruction'>
          Please Tick The Box To Show You Have Understood And Agree To Abide By Our Terms Of Use.
        </div>
      </div>
    </>
  )
}

export default AcceptTermsCheckBox;