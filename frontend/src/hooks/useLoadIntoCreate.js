import { useState } from "react";

import { UseDispatch, useDispatch } from "react-redux";
import { initialiseStoryFromDB } from "../components/Pages/create-stories-page/storyBookSysInfoSlice";
import { loadIntoCreate } from "../components/CreateStoryPageParts/story-book-create/storyBookSlice";
import { useAuthContext } from "./useAuthContext";
import { useLoadingContext } from "./useLoadingContext";

const baseUrl = process.env.NODE_ENV === 'production' ? window.env.API_URL : '';

export const useLoadIntoCreate = () => {
  const { user } = useAuthContext()
  const {loadingDispatch} = useLoadingContext()

  const [error, setError] = useState(null)

  const reduxDispatch = useDispatch()

  const loadIntoCreateHook = async (storyID) => {
    loadingDispatch({type: 'LOADING'})
    localStorage.removeItem('firstChapter')
    setError(null)

    // Going to code this to fetch from the DB even if the StoryBook obj is already in local. This allows for the book to be fetched
    // even if all that is available to the frontend is the storyID. Futurproofing.

    const response = await fetch(`${baseUrl}/fetch-stories/ID`, {
      method: 'Post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`,
    },
      body: JSON.stringify({storyID})
    })

    const JSONres = await response.json()

    if (!response.ok) {
      loadingDispatch({type: 'LOADED'})
      setError(JSONres.error)
    }

    if (response.ok) {
      const storyBook = JSONres.resStoryBook
      localStorage.setItem('localGPTPromptHistory', JSON.stringify(storyBook.GPTChatHistory))
      reduxDispatch(initialiseStoryFromDB(storyBook.character, storyBook.genre, storyBook.artstyle, storyBook.GPTChatHistory, storyBook._id, storyBook.SDPromptHistory))
      reduxDispatch(loadIntoCreate(storyBook.chapterImageURLs, storyBook.chapterText))
      loadingDispatch({type: 'LOADED'})
      // return (JSONres.filteredList)
    }
  }

  return { loadIntoCreateHook }
}