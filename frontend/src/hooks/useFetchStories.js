import { useState } from "react";

const baseUrl = process.env.NODE_ENV === 'production' ? window.env.API_URL : '';

export const useFetchStories = () => {
  
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const [bookList, setBookList] = useState([])

  const fetchByGenre = async (genre) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch(`${baseUrl}/fetch-stories/genre`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
    },
      body: JSON.stringify({genre})
    })

    const JSONres = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(JSONres.error)
    }

    if (response.ok) {
      setIsLoading(false)
      return (JSONres.filteredList)
    }
  }

  const fetchByUser = async (_id) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch(`${baseUrl}/fetch-stories/user`, {
      method: 'Post',
      headers: {
        'Content-Type': 'application/json',
    },
      body: JSON.stringify({_id})
    })

    const JSONres = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(JSONres.error)
    }

    if (response.ok) {
      setIsLoading(false)
      return (JSONres.filteredList)
    }
  }

  return { fetchByGenre, fetchByUser, isLoading, error, bookList, setBookList }
}