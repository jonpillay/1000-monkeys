import './FetchButton.css'

const FetchButton = (props) => {
  const fetchFunct = props.fetchFunct;
  const font = props.font
  const value = props.value;

  return (
    <div className='fetch-button-container'>
      <button onClick={fetchFunct} style={{fontFamily: font}} className="fetch-button">{value}</button>
    </div>
  )
}

export default FetchButton;