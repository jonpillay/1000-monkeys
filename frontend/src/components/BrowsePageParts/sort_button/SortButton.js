import { useEffect, useState } from 'react';
import './SortButton.css'

const SortButton = (props) => {

  const sortFunct = props.sortFunct
  const bookList = props.bookList
  const setDisplayBookList = props.setDisplayBookList
  const label = props.label
  const booksRead = props.booksRead || null
  const userID = props.userID
  const selectedSortButton = props.selectedSortButton
  const setSelectedSortButton = props.setSelectedSortButton

  const [buttonHover, setButtonHover] = useState(false)

  const handleSortClick = (e) => {

    e.preventDefault()

    let sortedBookList = null

    console.log(bookList)

    if (booksRead != null) {
      sortedBookList = sortFunct(bookList, booksRead, userID)
    } else {
      sortedBookList = sortFunct(bookList)
    }

    setSelectedSortButton(label)
    setDisplayBookList(sortedBookList)

  }

  return (
    <div className='sort-button-container'>
      <button disabled={bookList.length == 0} onMouseEnter={() => setButtonHover(true)} onMouseLeave={() => setButtonHover(false)} onClick={handleSortClick} className={selectedSortButton == label ? "sort-button selected" : buttonHover ? "sort-button hover" : "sort-button"}>{label}</button>
    </div>
  )
}

export default SortButton;