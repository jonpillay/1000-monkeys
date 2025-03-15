import './SortControlPanel.css'
import SortButton from '../sort_button/SortButton';

import { sortByNewest } from '../../../helpers/sortFuncts';

import { useEffect, useState, useRef } from 'react';

const SortControlPanel = (props) => {

  const [controlPanelScroll, setControlPanelScroll] = useState(false)

  const selectedButton = useRef()

  const setBookList = props.setBookList
  const bookList = props.bookList


  useEffect(() => {

    const controlScrollMouse = (event) => {
      if (window.scrollY > 28 && event.clientY < 210) {
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

//   const browseStorySetup = async (fetchFunct, keyword) => {

//     selectedButton.current = keyword

//     const bookList = await fetchFunct(keyword)

//     const pageNumbers = await JSON.parse(localStorage.getItem('browsePageNumbers')) || {}

//     bookList.forEach((book) => {
//       if (!(book._id in pageNumbers)) {
//         pageNumbers[book._id] = 0
//       }
//     })

//     localStorage.setItem('browsePageNumbers', JSON.stringify(pageNumbers))

//     setBookList(bookList)
//   }

// sort button needs functions

  return (
    <>
      <div className={controlPanelScroll ? "sort-nav-container active" : "sort-nav-container"}>
        <>
        <div className='button-container'>
            <SortButton bookList={bookList} setBookList={setBookList} sortFunct={sortByNewest} label={"New!"}/>
            <SortButton bookList={bookList} setBookList={setBookList}/>
            <SortButton bookList={bookList} setBookList={setBookList}/>
        </div>
        </>
      </div>
    </>
  );
}

export default SortControlPanel;