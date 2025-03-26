import { createContext, useReducer, useEffect } from "react";

import { clearStoryBookPersist } from "../redux-state/store";

export const StoryContext = createContext()

export const StoryReducer = (state, action) => {
  switch (action.type) {
    case 'BEGIN':
      return { story: true }
    case 'END':
      return { story: null }
    default:
      return state
  }
}

export const StoryContextProvider = ({ children }) => {

  const [state, dispatch] = useReducer(StoryReducer, {
    story: JSON.parse(localStorage.getItem('localGPTPromptHistory'))

  })

  useEffect(() => {
    const story = JSON.parse(localStorage.getItem('localGPTPromptHistory'))
    if (story) {
      dispatch({ type: 'BEGIN', payload: true })
    } else {
      clearStoryBookPersist()
    }
  }, [])

  return (
  <StoryContext.Provider value={{...state, dispatch}}>
    { children }
  </StoryContext.Provider>
  )
}