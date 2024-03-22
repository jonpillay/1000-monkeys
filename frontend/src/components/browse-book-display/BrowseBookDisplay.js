import "./BrowseBookDisplay.css";

import { useAuthContext } from "../../hooks/useAuthContext"

import StoryBookBrowseContainer from "../story-book-browse-container/StoryBookBrowseContainer";
import { useEffect } from "react";

const BrowseBookDisplay = (props) => {

  const {user} = useAuthContext()

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
    // console.log(typeof(book._id)); // Log the book object to the console
    return (
      <li key={book._id}>
        <StoryBookBrowseContainer
        // this is feeding down as undefined (user.id, have also tried _id, need to look up how to access)
          currentUser={user.id}
          authorID={book.user_id}
          bookID={book._id}
          author={book.author}
          title={book.title}
          chapterTexts={book.chapterText}
          chapterImgURLs={book.chapterImageURLs}
          character={book.character}
          genre={book.genre}
          artstyle={book.artstyle}
          AIEngine={book.AIEngine}
          ratings={book.ratings}
          pageNumber={pageNumbers[book._id]}
        />
      </li>
    );
  });

  return (
    <>
      <div className="browse-book-display-container">
        <ul className="browse-book-list">{browsingBooks}</ul>
      </div>
    </>
  )
}

export default BrowseBookDisplay;