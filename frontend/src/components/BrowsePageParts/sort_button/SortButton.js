import { useEffect, useState } from 'react';
import './SortButton.css'

const SortButton = (props) => {

  const sortFunct = props.sortFunct
  const bookList = props.bookList
  const setDisplayBookList = props.setDisplayBookList
  const label = props.label
  const booksRead = props.booksRead || null
  const userID = props.userID

  const [buttonHover, setButtonHover] = useState(false)

  const handleSortClick = (e) => {

    e.preventDefault()

    let sortedBookList = null

    console.log(bookList)

    if (booksRead != null) {
      console.log("This is here")
      console.log(bookList)
      sortedBookList = sortFunct(bookList, booksRead, userID)
    } else {
      sortedBookList = sortFunct(bookList)
    }

    setDisplayBookList(sortedBookList)

  }

  return (
    <div className='sort-button-container'>
      <button onMouseEnter={() => setButtonHover(true)} onMouseLeave={() => setButtonHover(false)} onClick={handleSortClick} className={"sort-button"}>{label}</button>
    </div>
  )
}

export default SortButton;