import './SortControlPanel.css'
import SortButton from '../sort_button/SortButton';

import { sortByNewest, sortByRating, sortByNewToYou } from '../../../helpers/sortFuncts';

import { useEffect, useState } from 'react';
import { useAuthContext } from '../../../hooks/useAuthContext';

const SortControlPanel = (props) => {

  const bookList = props.bookList
  const setDisplayBookList = props.setDisplayBookList
  const localBooksRead = props.localBooksRead

  const [controlPanelScroll, setControlPanelScroll] = useState(false)

  const { user } = useAuthContext()

  useEffect(() => {

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

  return (
    <>
      <div className={controlPanelScroll ? "sort-nav-container active" : "sort-nav-container"}>
        <>
        <div className='sort-control-button-container'>
            <SortButton bookList={bookList} setDisplayBookList={setDisplayBookList} sortFunct={sortByNewest} label={"Published"}/>
            <SortButton bookList={bookList} setDisplayBookList={setDisplayBookList} sortFunct={sortByRating} label={"Rating"}/>
            <SortButton bookList={bookList} setDisplayBookList={setDisplayBookList} sortFunct={sortByNewToYou} booksRead={localBooksRead} userID={user ? user.id : null} label={"New To You"}/>
        </div>
        </>
      </div>
    </>
  );
}

export default SortControlPanel;