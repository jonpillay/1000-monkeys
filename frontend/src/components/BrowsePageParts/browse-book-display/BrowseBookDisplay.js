import "./BrowseBookDisplay.css";

import StoryBookBrowseContainer from "../story-book-browse-container/StoryBookBrowseContainer";

const BrowseBookDisplay = (props) => {

  const pageNumbers = JSON.parse(localStorage.getItem('browsePageNumbers')) || {}

  // const browsingBooks = props.bookList.map(book => return ( <li><StoryBookBrowseContainer key={book._id} chapterTexts={book.chapterText} chapterImgURLs={book.chapterImageURLs} pageNumber={pageNumbers[book._id]}/></li> ) )
  const browsingBooks = props.bookList.map(book => {
    return (
      <li key={book._id}>
        <StoryBookBrowseContainer
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