import { StoryContext } from "../context/StoryContext";
import { useContext } from "react";

export const useStoryContext = () => {
  const context = useContext(StoryContext)

  if (!context) {
    throw Error('must be inside storyContextProvider to use')
  }

  return context
}