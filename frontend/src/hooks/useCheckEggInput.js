import { useNavigate } from "react-router"
import { useState } from "react"

export const useCheckEggInput = () => {

  const [ guessResponse, setGuessResponse ]= useState()

  const navigate = useNavigate()

  const checkEggInput = (inputPrompt) => {

    const splitPrompt = inputPrompt.split(" ")

    const splitPromptLowered = splitPrompt.map(word => word.toLowerCase())

    console.log(splitPromptLowered)

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