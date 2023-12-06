import "./BrowseBookDisplay.css";

import StoryBookBrowseContainer from "../story-book-browse-container/StoryBookBrowseContainer";
import { useEffect } from "react";

const BrowseBookDisplay = (props) => {

  /* 
  
  Browse renderer to map and display the return book list.

  */

  const pageNumbers = JSON.parse(localStorage.getItem('browsePageNumbers'))

  const bookList = props.bookList || []

  let browsingBooks;

  useEffect(() =>{
    if (bookList.length >0) {
      const browsingBooks = bookList.map(book => <li><StoryBookBrowseContainer key={book.id} chapterTexts={book.chapterText} chapterImgURLs={book.chapterImageURLs} pageNumber={pageNumbers[book.id]}/></li> )
    }
  }, [bookList])


  return (
    <>
      <div className="browse-book-display-container">
        <ul>{browsingBooks}</ul>
      </div>
    </>
  )
}

export default BrowseBookDisplay;