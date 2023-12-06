import './FetchControlPanel.css'
import NavButton from '../navbutton/NavButton';

import { useNavigate } from "react-router";
import { useAuthContext } from "../../hooks/useAuthContext";

const FetchStoriesControlPanel = (props) => {

  // import the callback from the FetchsStories and apply it to different genres etc... 

  const { user } = useAuthContext()

  const fetchByGenre = props.fetchByGenre

  const browseStorySetup = async (e, keyword) => {

    console.log("browse setup running")

    e.preventDefault()

    const bookList = await fetchByGenre(keyword)

    console.log(bookList)

    let pageNumbers;

    if (localStorage.getItem('browsePageNumbers')) {
      pageNumbers = JSON.parse(localStorage.getItem('browsePageNumbers'))
    } else {
      pageNumbers = {}
    }

    console.log(pageNumbers)

    bookList.forEach((book) => {
      if (!(book.id in pageNumbers)) {
        pageNumbers[book.id] = 0
      }
    })

    console.log("made is here")
    console.log(pageNumbers)

    localStorage.setItem('browsePageNumbers', JSON.stringify(pageNumbers))
  }

  return (
    <>
      <div className="filter-nav-container">
        <>
          <button onClick={(e) => browseStorySetup(e,"Western")} value="Western" className="genre-button" />
          {/* <NavButton onClick={fetchByGenre("Western")} value="Western" className="genre-button" /> */}
        </>
      </div>
    </>
  );
}

export default FetchStoriesControlPanel;