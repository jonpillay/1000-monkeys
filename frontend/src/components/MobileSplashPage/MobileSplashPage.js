import './MobileSplashPage.css';

const MobileSplashPage = (props) => {

  return (
    <div className="mobile-splash-container">
      <div className="mobile-splash-title">
        Hello Mobile User!
      </div>
      <div className='mobile-splash-text-container'>
        This Site Has Been Optimised To Run In A Desktop Environment.
        Head Over To Your Desktop or Laptop To Check It out.
      </div>
      <div className='mobile-splash-page-cta'>
        Or Head Over To My <a href='https://github.com/jonpillay'>GitHub</a> Or <a href='https://www.linkedin.com/in/jonpillay/'>Linkedin</a>
        To Find Out More
      </div>
    </div>
  )
}

export default MobileSplashPage;