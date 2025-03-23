import './ReverseOrderingArrow.css'
import { useState } from 'react'

// import SortArrow from "../../../img/sort-arrow.png"
import SortArrow from "../../../img/sort_arrow.png"

import { reverseBookListOrder } from '../../../helpers/sortFuncts'

const ReverseOrderingArrow = (props) => {

  const displayBookList = props.displayBookList
  const setDisplayBookList = props.setDisplayBookList

  const [ orderReversed, setOrderReversed ] = useState(false)
  const [ buttonHover, setButtonHover ] = useState()

  const handleReverseClick = () => {

    const reversedBookList = reverseBookListOrder(displayBookList)

    setDisplayBookList(reversedBookList)

    setOrderReversed(orderReversed => !orderReversed)


  }

  return (
    <div className='reverse-sort-button-container'>
      <input disabled={displayBookList.length == 0} type='image' src={SortArrow} onMouseEnter={() => setButtonHover(true)} onMouseLeave={() => setButtonHover(false)} onClick={handleReverseClick} className={ orderReversed ? "reverse-sort-button reversed" : buttonHover ? "reverse-sort-button hover" : "reverse-sort-button"}></input>
    </div>
  )
}

export default ReverseOrderingArrow