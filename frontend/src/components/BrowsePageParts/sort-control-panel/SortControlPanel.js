import './SortControlPanel.css'
import SortButton from '../sort_button/SortButton';

import { sortByNewest, sortByRating, sortByNewToYou } from '../../../helpers/sortFuncts';

import { useEffect, useState } from 'react';
import { useAuthContext } from '../../../hooks/useAuthContext';

import ReverseOrderingArrow from '../reverse-ordering-arrow/ReverseOrderingArrow';

const SortControlPanel = (props) => {

  const bookList = props.bookList
  const displayBookList = props.displayBookList
  const setDisplayBookList = props.setDisplayBookList
  const localBooksRead = props.localBooksRead
  const controlPanelScroll = props.controlPanelScroll

  const [selectedSortButton, setSelectedSortButton] = useState(null)

  const { user } = useAuthContext()

  useEffect(() => {
    setSelectedSortButton(null)
  }, [bookList])

  return (
    <>
      <div className={controlPanelScroll ? "sort-nav-container active" : "sort-nav-container"}>
        <>
        <div className='sort-control-button-container'>
            <SortButton bookList={bookList} setDisplayBookList={setDisplayBookList} sortFunct={sortByNewest} selectedSortButton={selectedSortButton} setSelectedSortButton={setSelectedSortButton} label={"Published"}/>
            <SortButton bookList={bookList} setDisplayBookList={setDisplayBookList} sortFunct={sortByRating} selectedSortButton={selectedSortButton} setSelectedSortButton={setSelectedSortButton} label={"Rating"}/>
            { user? <SortButton bookList={bookList} setDisplayBookList={setDisplayBookList} sortFunct={sortByNewToYou} selectedSortButton={selectedSortButton} setSelectedSortButton={setSelectedSortButton} booksRead={localBooksRead} userID={user ? user.id : null} label={"New To You"}/> : null}
            <ReverseOrderingArrow displayBookList={displayBookList} setDisplayBookList={setDisplayBookList}/>  
        </div>
        </>
      </div>
    </>
  );
}

export default SortControlPanel;