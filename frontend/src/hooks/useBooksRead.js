import { useState, useEffect } from "react";
import { useAuthContext } from "./useAuthContext";

const baseUrl = process.env.NODE_ENV === 'production' ? window.env.API_URL : '';

export const useBooksRead = () => {

  const {user}  = useAuthContext()
  const [ localBooksRead, setLocalBooksRead ] = useState([])

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
  }

  return { addBookRead, localBooksRead, setLocalBooksRead }
}