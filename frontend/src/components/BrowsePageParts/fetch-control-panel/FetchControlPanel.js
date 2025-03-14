import './FetchControlPanel.css'
import FetchButton from '../fetch-button/FetchButton';

import { useEffect, useState, useRef } from 'react';

import { useNavigate } from "react-router";
import { useAuthContext } from "../../../hooks/useAuthContext";

const FetchStoriesControlPanel = (props) => {

  // import the callback from the FetchsStories and apply it to different genres etc...

  const {user} = useAuthContext()

  const [controlPanelTop, setControlPanelTop] = useState(false)
  const [controlPanelScroll, setControlPanelScroll] = useState(false)

  const selectedButton = useRef()


  useEffect(() => {

    // const controlTopScroll = () => {
    //   if (window.scrollY > 50) {
    //     setControlPanelTop(true)
    //   } else {
    //     setControlPanelTop(false)
    //   }
    // };

    // window.addEventListener('scroll', controlTopScroll);

    // const controlTopMouse = (event) => {
    //   if (event.clientY < 70) {
    //     setControlPanelTop(true)
    //   } else {
    //     setControlPanelTop(false)
    //   }
    // }

    const controlScrollMouse = (event) => {
      if (window.scrollY > 28 && event.clientY < 170) {
        console.log("This is firing")
        setControlPanelScroll(true)
      } else {
        console.log("This is not firing")
        setControlPanelScroll(false)
      }
    }

    window.addEventListener('scroll', controlScrollMouse);
    window.addEventListener('mousemove', controlScrollMouse);

    return () => {
      window.removeEventListener('scroll', controlScrollMouse);
      window.removeEventListener('mousemove', controlScrollMouse);
    }

  }, [])

  const fetchByGenre = props.fetchByGenre

  const fetchByUser = props.fetchByUser

  const setBookList = props.setBookList

  const browseStorySetup = async (fetchFunct, keyword) => {

    selectedButton.current = keyword

    const bookList = await fetchFunct(keyword)

    const pageNumbers = await JSON.parse(localStorage.getItem('browsePageNumbers')) || {}

    bookList.forEach((book) => {
      if (!(book._id in pageNumbers)) {
        pageNumbers[book._id] = 0
      }
    })

    localStorage.setItem('browsePageNumbers', JSON.stringify(pageNumbers))

    setBookList(bookList)
  }

  return (
    <>
      <div className={controlPanelScroll ? "filter-nav-container active" : "filter-nav-container"}>
        <>
        <div className='button-container'>
            <FetchButton selectedButton={selectedButton.current} fetchFunct={() => browseStorySetup(fetchByGenre, "Dystopian")} font={"phage-rough"} value="Dystopian" className="genre-button" />
            <FetchButton selectedButton={selectedButton.current} fetchFunct={() => browseStorySetup(fetchByGenre, "Western")} font={"rye"} value="Western" className="genre-button" />
            <FetchButton selectedButton={selectedButton.current} fetchFunct={() => browseStorySetup(fetchByGenre, "Fairytale")} font={"flavors"} value="Fairytale" className="genre-button" />
            <FetchButton selectedButton={selectedButton.current} fetchFunct={() => browseStorySetup(fetchByGenre, "Cyberpunk")} font={"cynatar"} value="Cyberpunk" className="genre-button" />
            <FetchButton selectedButton={selectedButton.current} fetchFunct={() => browseStorySetup(fetchByGenre, "Sci-Fi")} font={"major-mono"} value="Sci-Fi" className="genre-button" />
        </div>
        </>
        {( user ?
          <div className="user-fetch-button-container">
            <FetchButton selectedButton={selectedButton.current} fetchFunct={() => browseStorySetup(fetchByUser, user._id)} font={"major-mono"} value="My Stories" className="user-fetch-button" />
          </div>
          :
          <div className="user-fetch-filler">
            
          </div>
        )}

      </div>
    </>
  );
}

export default FetchStoriesControlPanel;