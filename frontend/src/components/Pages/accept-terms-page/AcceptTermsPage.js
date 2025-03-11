import "./AcceptTermsPage.css";
import { useEffect } from "react";
import { useLocation } from "react-router";
import { useHistory } from 'react-router-dom';

import TermsOfUsePage from "../terms-of-use-page/TermsOfUsePage";
import AcceptTermsForm from "../../TermsOfUseParts/accept-terms-form/AcceptTermsForm";

import { useAcceptTerms } from "../../../hooks/useAcceptTerms";
import { useLogout } from "../../../hooks/useLogout";

const AcceptTermsPage = (props) => {

  const location = useLocation()

  const {logout} = useLogout()

  useEffect(() => {

    const handleUserPageNavigation = (event) => {

      event.preventDefault()

      const userNavPrompt = window.confirm(
        "Please Accept Our Term of Use to Proceed."
      )

      if (userNavPrompt) {

        window.location.href = event.target.href

        if (event.type === 'beforeunload') {
          logout()
          window.location.reload();
        }
      } else {
        return
      }
    }

    console.log("useEffect in terms firing")

    window.addEventListener('beforeunload', handleUserPageNavigation)

    return () => {
      window.removeEventListener('beforeunload', handleUserPageNavigation);
    }

  }, [location.state])

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