import './MobileSplashPage.css';

import SpinningMonkey from "../../../img/favpng_infinite-monkey-theorem3.png"

import MonkeySpinner from '../LoadingPageParts/monkey-spinner/MonkeySpinner';

const MobileSplashPage = (props) => {

  return (
    <div className="mobile-splash-container">
      <div className='spinner-container'>
        <MonkeySpinner/>
      </div>
      <div className="mobile-splash-title">
        Hello Mobile User!
      </div>
      <div className='mobile-splash-text-container'>
        <div>The 1000 Monkeys App Has Been Optimised To Run In Desktop Browsers</div>
        <div>Grab Your Laptop or Keyboard to Check It Out</div>
      </div>
      <div className='mobile-splash-page-cta'>
        <div>Or Head Over To My <a href='https://github.com/jonpillay' target="_blank" rel="noopener noreferrer">GitHub</a> Or <a href='https://www.linkedin.com/in/jonpillay/' target="_blank" rel="noopener noreferrer">Linkedin</a></div>
        <div>To Find Out More About Me (The Dev)</div>
      </div>
      <div className='mobile-splash-page-video-cta'>
        <div>Check Out A video Introduction to 1000M</div>
        <div> <a href='https://gumlet.tv/playlist/684584bf0f8d7a0518536218/' target="_blank" rel="noopener noreferrer">HERE</a></div>
      </div>
    </div>
  )
}

export default MobileSplashPage;