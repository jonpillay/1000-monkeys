import './MobileSplashPage.css';

const MobileSplashPage = (props) => {

  return (
    <div className="mobile-splash-container">
      <div className="mobile-splash-title">
        Hello Mobile User!
      </div>
      <div className='mobile-splash-text-container'>
        The 1000 Monkeys App Has Been Optimised To Run In A Desktop Environment
        Head Over To Your Desktop or Laptop To Check It out
      </div>
      <div className='mobile-splash-page-cta'>
        Or Head Over To My <a href='https://github.com/jonpillay' target="_blank" rel="noopener noreferrer">GitHub</a> Or <a href='https://www.linkedin.com/in/jonpillay/' target="_blank" rel="noopener noreferrer">Linkedin</a>
        To Find Out More About Me (The Dev)
      </div>
      <div className='mobile-splash-page-video-cta'>
        Check Out A video Introduction to 1000M <a href='https://gumlet.tv/playlist/684584bf0f8d7a0518536218/' target="_blank" rel="noopener noreferrer">here</a>
        To Find Out More About Me (The Dev)
      </div>
    </div>
  )
}

export default MobileSplashPage;