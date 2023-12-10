import "./BrowseBookDisplay.css";

import StoryBookBrowseContainer from "../story-book-browse-container/StoryBookBrowseContainer";
import { useEffect } from "react";

const BrowseBookDisplay = (props) => {

  /* 
  
  Browse renderer to map and display the return book list.

  */

  // useEffect(() => {

  //   let pageNumbers;

  //   const getPageNumbers = async () => {
  //     const pageNumbers = await JSON.parse(localStorage.getItem('browsePageNumbers')) || {}
  //   }
  // })

  const pageNumbers = JSON.parse(localStorage.getItem('browsePageNumbers')) || {}


  // const browsingBooks = props.bookList.map(book => return ( <li><StoryBookBrowseContainer key={book._id} chapterTexts={book.chapterText} chapterImgURLs={book.chapterImageURLs} pageNumber={pageNumbers[book._id]}/></li> ) )

  const browsingBooks = props.bookList.map(book => {
    console.log(typeof(book._id)); // Log the book object to the console
    return (
      <li key={book._id}>
        <StoryBookBrowseContainer
          id={book._id}
          chapterTexts={book.chapterText}
          chapterImgURLs={book.chapterImageURLs}
          pageNumber={pageNumbers[book._id]}
        />
      </li>
    );
  });

  console.log(browsingBooks)

  return (
    <>
      <div className="browse-book-display-container">
        <ul>{browsingBooks}</ul>
      </div>
    </>
  )
}

export default BrowseBookDisplay;