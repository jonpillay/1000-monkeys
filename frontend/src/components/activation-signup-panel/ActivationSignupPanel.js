import "./ActivationSignupPanel.css";
import ActivationForm from "../activation-form/ActivationForm";
import SignupForm from "../signup-form/SignupForm";
import HomeButton from "../header/Header";
import { useActivate } from "../../hooks/useActivate";
import { useEffect, useState } from "react";

const ActivationSignupPanel = (props) => {

  const { activate, isLoading, error, signupActive } = useActivate()

  return (
    <div className="activation-signup-panel">
    {(!signupActive ? 
      <ActivationForm activate={activate} isLoading={isLoading} error={error} signupActive={signupActive}/>
      :
      <SignupForm signupActive={signupActive}/>
    )}
    </div>

  )
}

export default ActivationSignupPanel;