import { useEffect, useState } from 'react';
import './SortButton.css'

const SortButton = (props) => {

  const sortFunct = props.sortFunct
  const bookList = props.bookList
  const setBookList = props.setBookList
  const label = props.label

  const [buttonHover, setButtonHover] = useState(false)

  const handleSortClick = () => {

    const sortedBookList = sortFunct(bookList)

    setBookList(sortedBookList)

  }

  return (
    <div className='sort-button-container'>
      <button onMouseEnter={() => setButtonHover(true)} onMouseLeave={() => setButtonHover(false)} onClick={handleSortClick} className={ true ? "sort-button selected" : buttonHover ? "sort-button hover" : "sort-button"}>{label}</button>
    </div>
  )
}

export default SortButton;