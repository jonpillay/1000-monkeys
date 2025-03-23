import { useState, useEffect } from "react";
import { useAuthContext } from "./useAuthContext";

const baseUrl = process.env.NODE_ENV === 'production' ? window.env.API_URL : '';

export const useBooksRead = () => {

  const {user}  = useAuthContext()
  const [ localBooksRead, setLocalBooksRead ] = useState(user ? user.booksRead : [])

  const addBookRead = async (bookID) => {

    setLocalBooksRead(localBooksRead => [...localBooksRead, bookID]);

    const reqBody = {bookID}

    const response = await fetch(`${baseUrl}/user/book-read`, {
      method: 'Post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
      body: JSON.stringify(reqBody)
    })

    const JSONres = await response.json()

    if (response.ok) {
      setLocalBooksRead(JSONres.booksRead)
    }
  }

  return { addBookRead, localBooksRead, setLocalBooksRead }
}