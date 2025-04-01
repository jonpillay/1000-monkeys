import "./BrowseBookDisplay.css";

import StoryBookBrowseContainer from "../story-book-browse-container/StoryBookBrowseContainer";
import { useAuthContext } from "../../../hooks/useAuthContext";

import { useBooksRead } from "../../../hooks/useBooksRead";

import { useState, useEffect } from "react";

const BrowseBookDisplay = (props) => {

  const localBooksRead = props.localBooksRead
  const addBookRead = props.addBookRead

  const { user } = useAuthContext()

  const [ bookListEmpty, setBookListEmpty ] = useState(props.displayBookList.length < 1)

  const pageNumbers = JSON.parse(localStorage.getItem('browsePageNumbers')) || {}

  useEffect(() => {

    if (props.displayBookList.length > 0) setBookListEmpty(false);

  }, [props.displayBookList])

  // const browsingBooks = props.bookList.map(book => return ( <li><StoryBookBrowseContainer key={book._id} chapterTexts={book.chapterText} chapterImgURLs={book.chapterImageURLs} pageNumber={pageNumbers[book._id]}/></li> ) )
  const browsingBooks = props.displayBookList.map(book => {
    return (
      <li key={book._id}>
        <StoryBookBrowseContainer
          currentUser = {user}
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
          GPTChatHistory={book.GPTChatHistory}
          SDPromptHistory = {book.SDPromptHistory}
          pageNumber={pageNumbers[book._id]}
          addBookRead={addBookRead}
          localBooksRead={localBooksRead}
          ratingsAverage={book.ratingsAverage}
        />
      </li>
    );
  });

  return (
    <>
      <div className="browse-book-display-container">
        { !bookListEmpty ?
        <ul className="browse-book-list">{browsingBooks}</ul>
          :
        <div className="load-book-cta-container">
          <div className="load-book-cta-border">
            <div className="load-book-cta">
              Please Choose A Genre To Load Books
            </div>
          </div>
        </div>
        }
      </div>
    </>
  )
}

export default BrowseBookDisplay;