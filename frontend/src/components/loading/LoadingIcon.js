import './LoadingIcon.css';

const LoadingIcon = () => {
  return (
    <div className="background">
      <div className="container">
        <h2>Crafting your story...</h2>
        <img className='loading-icon' src="/images/slow-turning-pages.gif" alt="book-gif" />
      </div>
    </div>
  )
}

export default LoadingIcon;
