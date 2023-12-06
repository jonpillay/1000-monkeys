import "./BrowsePage.css";

import { useFetchStories } from "../../hooks/useFetchStories";

import FetchStoriesControlPanel from "../fetch-control-panel/FetchControlPanel";

import BrowseBookDisplay from "../browse-book-display/BrowseBookDisplay"

import StoryBookBrowse from "../story-book-browse/StoryBookBrowse";

const BrowsePage = (props) => {

  const { fetchByGenre, isLoading, error, bookList, setBookList } = useFetchStories()

  /* 
  
  Browse page needs to make the api call and return a list of the filtered books dependant on genre
  and map/render them to the 

  Browse container should then handle the rendering of the BrowseStoryBook(s)

  */

  return (
    <>
    <div className="browse-container">
      <FetchStoriesControlPanel fetchByGenre={fetchByGenre} setBookList={setBookList} />
      <BrowseBookDisplay bookList={bookList}/>
    </div>
    </>
  )
}

export default BrowsePage;