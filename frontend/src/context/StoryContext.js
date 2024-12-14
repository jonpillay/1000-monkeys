import { createContext, useReducer, useEffect } from "react";

import { clearReduxPersist } from "../redux-state/store";

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
    story: null
  })

  useEffect(() => {
    const story = JSON.parse(localStorage.getItem('localGPTPromptHistory'))
    if (story) {
      dispatch({ type: 'BEGIN', payload: true })
    } else {
      clearReduxPersist()
    }
  }, [])

  return (
  <StoryContext.Provider value={{...state, dispatch}}>
    { children }
  </StoryContext.Provider>
  )
}