import { useEffect, useState } from "react";

import { useNavigate } from "react-router";

import { useAuthContext } from "./useAuthContext";
import { useStoryContext } from "./useStoryContext";

import { useDispatch, useSelector } from "react-redux";
import { selectAllWarnings, issueWarning } from "../components/app/systemInfoSlice";

export const useMonitorUserWarnings = () => {

  const reduxDispatch = useDispatch()
  const warnings = useSelector(selectAllWarnings)

  const navigate = useNavigate()

  const { dispatch: authDispatch } = useAuthContext()
  const { dispatch: storyDispatch } = useStoryContext()

  const [ userWarningMessage, setUserWarningMessage ] = useState()

  const handleUserWarning = () => {

    reduxDispatch(issueWarning())

    switch(warnings) {

      case 1:
        setUserWarningMessage("This is your first warning buddy! You've got 4 More.")
        break

      case 2:
        setUserWarningMessage("Second warning, this is getting sus. 3 Warnings left.")
        break

      case 3:
        setUserWarningMessage("Third time's a charm. 2 warnings left!")
        break

      case 4:
        setUserWarningMessage("Final warning pal!")
        break

      case 5:
        localStorage.removeItem('user')
        localStorage.removeItem('storyPages')
        localStorage.removeItem('sysInfo');
        localStorage.removeItem('userChoices');
        localStorage.removeItem('GPTPromptHistory');
        localStorage.removeItem('localGPTPromptHistory');
        authDispatch({type: 'LOGOUT'})
        storyDispatch({type: 'END'})
        localStorage.setItem('firstChapter', 'true')
        navigate('/', {
          state: {error: "You Were Warned!", warnedState: "FRONTENDREPEAT"},
        })
        break
    }

  }

  return { handleUserWarning, userWarningMessage }

}