import './FetchControlPanel.css'
import FetchButton from '../fetch-button/FetchButton';

import { useEffect, useState } from 'react';

import { useNavigate } from "react-router";
import { useAuthContext } from "../../hooks/useAuthContext";

const FetchStoriesControlPanel = (props) => {

  // import the callback from the FetchsStories and apply it to different genres etc... 

  const [controlPanelTop, setControlPanelTop] = useState(false)
  const [controlPanelScroll, setControlPanelScroll] = useState(false)


  useEffect(() => {
    const controlTopScroll = () => {
      if (window.scrollY > 50) {
        setControlPanelTop(true)
      } else {
        setControlPanelTop(false)
      }
    };

    window.addEventListener('scroll', controlTopScroll);

    // const controlTopMouse = (Mpos) => {
    //   if (Mpos.clientY < 70) {
    //     setControlPanelTop(true)
    //   } else {
    //     setControlPanelTop(false)
    //   }
    // }

    const controlScrollnMouse = (Mpos) => {
      if (window.scrollY > 10 && Mpos.clientY < 200) {
        setControlPanelScroll(true)
      } else {
        setControlPanelScroll(false)
      }
    }

    document.addEventListener('mousemove', controlScrollnMouse);


    // document.addEventListener('mousemove', controlTopMouse);

  }, [])

  const fetchByGenre = props.fetchByGenre

  const setBookList = props.setBookList

  const browseStorySetup = async (fetchFunct, keyword) => {

    console.log("browse setup running")

    const bookList = await fetchFunct(keyword)

    console.log(bookList)

    const pageNumbers = await JSON.parse(localStorage.getItem('browsePageNumbers')) || {}

    // if (localStorage.getItem('browsePageNumbers')) {
    //   pageNumbers = JSON.parse(localStorage.getItem('browsePageNumbers'))
    // } else {
    //   pageNumbers = {}
    // }

    console.log(pageNumbers)

    bookList.forEach((book) => {
      if (!(book._id in pageNumbers)) {
        pageNumbers[book._id] = 0
      }
    })

    await localStorage.setItem('browsePageNumbers', JSON.stringify(pageNumbers))

    setBookList(bookList)
  }

  return (
    <>
      <div className={controlPanelTop ? controlPanelScroll ? "filter-nav-container active-scroll" : "filter-nav-container active" : "filter-nav-container"}>
        <>
          <FetchButton fetchFunct={() => browseStorySetup(fetchByGenre, "Dystopian")} font={"phage-rough"} value="Dystopian" className="genre-button" />
          <FetchButton fetchFunct={() => browseStorySetup(fetchByGenre, "Western")} font={"rye"} value="Western" className="genre-button" />
          <FetchButton fetchFunct={() => browseStorySetup(fetchByGenre, "Fairytale")} font={"flavors"} value="Fairytale" className="genre-button" />
          <FetchButton fetchFunct={() => browseStorySetup(fetchByGenre, "Cyberpunk")} font={"cynatar"} value="Cyberpunk" className="genre-button" />
          <FetchButton fetchFunct={() => browseStorySetup(fetchByGenre, "Sci-Fi")} font={"major-mono"} value="Sci-Fi" className="genre-button" />




          {/* <NavButton onClick={fetchByGenre("Western")} value="Western" className="genre-button" /> */}
        </>
      </div>
    </>
  );
}

export default FetchStoriesControlPanel;