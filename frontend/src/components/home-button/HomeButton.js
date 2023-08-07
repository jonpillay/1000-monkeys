import './HomeButton.css';
import HomeIcon from './typing-logo.png';
import Nav from '../nav/Nav'

const HomeButton = ({ navigate }) => {
  const goHome = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="home-button-container">
      <div className="home-button" onClick={goHome}>
        <img className="home-icon" src={HomeIcon} alt="home" />
      </div>
      <div className='title-container'>
        <div className='title'>1000 Monkeys</div>
      </div>
      <div>
        <Nav/>
      </div>
    </div>
  );
};

export default HomeButton;
