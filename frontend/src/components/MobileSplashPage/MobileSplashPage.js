import './MobileSplashPage.css';

const MobileSplashPage = (props) => {

  const mobileSplashText = "The 1000 Monkeys App Has Been Optimised To Run In A Desktop Environment\n Head Over To Your Desktop or Laptop To Check It out"

  // const mobileCTAtext = "Or Head Over To My <a href='https://github.com/jonpillay' target="_blank" rel="noopener noreferrer">GitHub</a> Or <a href='https://www.linkedin.com/in/jonpillay/' target="_blank" rel="noopener noreferrer">Linkedin</a>\nTo Find Out More About Me (The Dev)"

  return (
    <div className="mobile-splash-container">
      <div className="mobile-splash-title">
        Hello Mobile User!
      </div>
      <div className='mobile-splash-text-container'>
        {mobileSplashText}
      </div>
      <div className='mobile-splash-page-cta'>
        <div>Or Head Over To My <a href='https://github.com/jonpillay' target="_blank" rel="noopener noreferrer">GitHub</a> Or <a href='https://www.linkedin.com/in/jonpillay/' target="_blank" rel="noopener noreferrer">Linkedin</a></div>
        <div>To Find Out More About Me (The Dev)</div>
      </div>
      <div className='mobile-splash-page-video-cta'>
        <div>Check Out A video Introduction to 1000M</div>
        <div> <a href='https://gumlet.tv/playlist/684584bf0f8d7a0518536218/' target="_blank" rel="noopener noreferrer">here</a></div>
      </div>
    </div>
  )
}

export default MobileSplashPage;