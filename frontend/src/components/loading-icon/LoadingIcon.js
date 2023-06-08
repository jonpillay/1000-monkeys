import './LoadingIcon.css';

const LoadingIcon = () => {
  return (
    <div className="container">
      <h1 className="sub-title">Please wait we are crafting your story...</h1>
      <div className="book">
        <div className="book__pg-shadow"></div>
        <div className="book__pg"></div>
        <div className="book__pg book__pg--2"></div>
        <div className="book__pg book__pg--3"></div>
        <div className="book__pg book__pg--4"></div>
        <div className="book__pg book__pg--5"></div>
      </div>
    </div>
  )  
}

export default LoadingIcon;
