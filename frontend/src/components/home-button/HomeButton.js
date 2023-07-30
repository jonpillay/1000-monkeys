import './HomeButton.css';
import HomeIcon from './typing-logo.png';

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
        <text className='title'>1000 Monkeys</text>
      </div>
    </div>
  );
};

export default HomeButton;
