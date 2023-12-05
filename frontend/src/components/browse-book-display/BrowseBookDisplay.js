import "./BrowseBookDisplay.css";

import StoryBookBrowseContainer from "../story-book-browse-container/StoryBookBrowseContainer";

const BrowseBookDisplay = (props) => {

  /* 
  
  Browse renderer to map and display the return book list.

  */

  const pageNumbers = JSON.parse(localStorage.getItem('browsePageNumbers'))

  const bookList = props.bookList

  const browsingBooks = bookList.map(book => <li><StoryBookBrowseContainer key={book.id} chapterTexts={book.chapterText} chapterImgURLs={chapterImageURLs} pageNumber={pageNumbers[book.id]}/></li> ) 

  return (
    <>
    <div className="browse-book-display-container">
      <ul>{browsingBooks}</ul>
    </div>
    </>
  )
}

export default BrowseBookDisplay;