import { useNavigate } from "react-router"
import { useState } from "react"

export const useCheckEggInput = () => {

  /*

  Checks prompt input from InitialiseStoryForm for easter egg initialisation.

  1. Add prefix to your prompt input on 'start-your-story' page with 'guess= '.
  
  2. A guess of 'cup' would be 'guess= cup'.

  3. Answer the riddle 'What gets wet whilst drying?'

  4. Trigger the easter egg.

  5. Easter Egg initialisation only works from the prompt entry in 'start-your-story' prompt entry.

  */

  const [ guessResponse, setGuessResponse ]= useState()

  const navigate = useNavigate()

  const checkEggInput = (inputPrompt) => {

    const splitPrompt = inputPrompt.split(" ")

    const splitPromptLowered = splitPrompt.map(word => word.toLowerCase())

    if (splitPromptLowered.includes('guess=')) {
      if (splitPromptLowered.includes(process.env.REACT_APP_WHAT_GETS_WET_WHILST_DRYING)) {
        navigate('/', {
          state: {error: "Egg Activated!", warnedState: "EASTEREGGACTIVATED"},
        })
        return true
      } else {
        setGuessResponse("Incorrect Guess! Please Try Again.")
        return false
      }
    }
  }

  return { checkEggInput, guessResponse, setGuessResponse }

}