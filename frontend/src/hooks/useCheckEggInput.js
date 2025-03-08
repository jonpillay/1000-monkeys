import { useNavigate } from "react-router"
import { useState } from "react"

import { useLoadingContext } from "./useLoadingContext"

const baseUrl = process.env.NODE_ENV === 'production' ? window.env.API_URL : '';

export const useCheckEggInput = () => {

  const {loadingDispatch} = useLoadingContext()

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

  const checkEggInput = async (inputPrompt) => {

    const splitPrompt = inputPrompt.split(" ")

    const splitPromptLowered = splitPrompt.map(word => word.toLowerCase())

    console.log(splitPromptLowered[0])

    if (splitPromptLowered[0] == 'guess=') {

      const inputGuess = splitPromptLowered.slice(1).join(" ")

      try {

        const reqBody = {
          eggguess: inputGuess
        }
  
        const response = await fetch(`${baseUrl}/check-api/checkegg`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(reqBody),
        })
        
        const data = await response.json()
  
        if (data.decision == 1) {
          return true
        } else if (data.decision == 0) {
          return false
        } else {
          console.log(data.error)
          return data.error
        }
  
      } catch (error) {
        console.log(error)
        return error
      }
    }
  }

  return { checkEggInput, guessResponse, setGuessResponse }

}