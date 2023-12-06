import "./BrowseBookDisplay.css";

import StoryBookBrowseContainer from "../story-book-browse-container/StoryBookBrowseContainer";
import { useEffect } from "react";

const BrowseBookDisplay = (props) => {

  /* 
  
  Browse renderer to map and display the return book list.

  */

  const pageNumbers = JSON.parse(localStorage.getItem('browsePageNumbers'))


  const browsingBooks = props.bookList.map(book => <li><StoryBookBrowseContainer key={book._id} chapterTexts={book.chapterText} chapterImgURLs={book.chapterImageURLs} pageNumber={pageNumbers[book._id]}/></li> )


  return (
    <>
      <div className="browse-book-display-container">
        <ul>{browsingBooks}</ul>
      </div>
    </>
  )
}

export default BrowseBookDisplay;