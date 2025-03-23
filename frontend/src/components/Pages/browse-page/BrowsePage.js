import "./BrowsePage.css";

import { useEffect, useState } from "react";
import { useLocation } from "react-router";

import { useFetchStories } from "../../../hooks/useFetchStories";
import { useAuthContext } from "../../../hooks/useAuthContext";

import FetchStoriesControlPanel from "../../BrowsePageParts/fetch-control-panel/FetchControlPanel";
import SortControlPanel from "../../BrowsePageParts/sort-control-panel/SortControlPanel";

import BrowseBookDisplay from "../../BrowsePageParts/browse-book-display/BrowseBookDisplay"

import StoryBookBrowse from "../../BrowsePageParts/story-book-browse/StoryBookBrowse";

import { useBooksRead } from "../../../hooks/useBooksRead";

const BrowsePage = (props) => {

  const { fetchByGenre, fetchByUser, isLoading, error, bookList, setBookList } = useFetchStories()

  const { addBookRead, localBooksRead, setLocalBooksRead } = useBooksRead()

  const [ displayBookList, setDisplayBookList ] = useState(bookList)

  const [controlPanelScroll, setControlPanelScroll] = useState(false)

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
      if (window.scrollY > window.innerHeight/8 && event.clientY < window.innerHeight/4) {
        setControlPanelScroll(true)
      } else {
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

  useEffect(() => {
    setDisplayBookList(bookList)
  }, [bookList])

  /* 
  
  Browse page makes the api call and return a list of the filtered books dependant on genre
  and map/render them to the 

  Browse container should then handle the rendering of the BrowseStoryBook(s)

  */

  return (
    <>
    <div className="browse-container">
      <div className={ controlPanelScroll ? "browse-control-container active" : "browse-control-container"}>
        <FetchStoriesControlPanel fetchByGenre={fetchByGenre} fetchByUser={fetchByUser} setBookList={setBookList} controlPanelScroll={controlPanelScroll} />
        <SortControlPanel bookList={bookList} displayBookList={displayBookList} setDisplayBookList={setDisplayBookList} localBooksRead={localBooksRead} controlPanelScroll={controlPanelScroll}/>
      </div>
      <BrowseBookDisplay bookList={bookList} displayBookList={displayBookList} localBooksRead={localBooksRead} addBookRead={addBookRead}/>
    </div>
    </>
  )
}

export default BrowsePage;