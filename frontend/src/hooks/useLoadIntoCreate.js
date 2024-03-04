import { useState } from "react";

import { UseDispatch, useDispatch } from "react-redux";
import { initialiseStoryFromDB } from "../components/create-stories-page/storyBookSysInfoSlice";
import { loadIntoCreate } from "../components/story-book/storyBookSlice";
import { useAuthContext } from "./useAuthContext";

export const useLoadIntoCreate = () => {
  const { user } = useAuthContext()
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)

  const reduxDispatch = useDispatch()

  const loadIntoCreate = async (storyID) => {
    setIsLoading(true)
    setError(null)

    // Going to code this to fetch from the DB even if the StoryBook obj is already in local. This allows for the book to be fetched
    // even if all that is available to the frontend is the storyID. Futurproofing.

    const response = await fetch('./fetch-stories/ID', {
      method: 'Post',
      headers: {
        'Content-Type': 'application/json',
    },
      body: JSON.stringify({storyID})
    })

    const JSONres = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(JSONres.error)
    }

    if (response.ok) {
      const storyBook = JSONres
      reduxDispatch(initialiseStoryFromDB(storyBook.character, storyBook.genre, storyBook.artstyle, storyBook.GPTChatHistory))
      reduxDispatch(loadIntoCreate(storyBook.chapterImageURLs, storyBook.chapterText))
      setIsLoading(false)
      // return (JSONres.filteredList)
    }
  }

  return { loadIntoCreate }
}