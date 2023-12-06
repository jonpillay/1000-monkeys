import { useState, useContext } from "react";


export const useFetchStories = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const [bookList, setBookList] = useState([])

  const fetchByGenre = async (genre) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch('./fetch-stories/genre', {
      method: 'Post',
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
      return (JSONres.filteredList)
      setIsLoading(false)
    }
  }

  return { fetchByGenre, isLoading, error, bookList, setBookList }
}