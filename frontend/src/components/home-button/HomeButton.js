import './HomeButton.css';
import HomeIcon from './home-icon.png';

const HomeButton = ({ navigate }) => {
  const goHome = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="home-button-container">
      <button className="home-button" onClick={goHome}>
        <img className="home-icon" src={HomeIcon} alt="home" />
      </button>
    </div>
  );
};

export default HomeButton;
