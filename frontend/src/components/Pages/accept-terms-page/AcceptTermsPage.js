import "./AcceptTermsPage.css";

import TermsOfUsePage from "../terms-of-use-page/TermsOfUsePage";
import AcceptTermsForm from "../../TermsOfUseParts/accept-terms-form/AcceptTermsForm";

const AcceptTermsPage = (props) => {

  return (
    <>
    <div className="accept-terms-container">
      <div className="accept-terms-flex">
        <TermsOfUsePage/>
        <AcceptTermsForm/>
      </div>
    </div>
    </>
  )
}

export default AcceptTermsPage;