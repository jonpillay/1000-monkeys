import './MonkeySpinner.css'

import SpinningMonkey from "../../../img/favpng_infinite-monkey-theorem3.png"

const MonkeySpinner = () => {

  return (
    <div className='spinning-monkey-container'>
      <img className='spinning-monkey' src={SpinningMonkey}/>
    </div>
  )
}

export default MonkeySpinner;