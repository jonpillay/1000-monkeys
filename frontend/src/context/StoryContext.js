import { createContext, useReducer, useEffect } from "react";
import { useStoryContext } from "../hooks/useStoryContext";

export const StoryContext = createContext()

export const storyReducer = (state, action) => {
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
  const [state, dispatch] = useReducer(storyReducer, {
    story: null
  })

  useEffect(() => {
    const story = JSON.parse(localStorage.getItem('storyPages'))
    if (story) {
      dispatch({ type: 'BEGIN', payload: "this" })
    }
  }, [])

  console.log("StoryContext state:", state)

  return (
  <StoryContext.Provider value={{...state, dispatch}}>
    { children }
  </StoryContext.Provider>
  )
}