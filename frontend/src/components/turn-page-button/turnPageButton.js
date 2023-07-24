import "./TurnPageButton.css"

const TurnPageButton = (props) => {
  return (
    <button className="turn-page-button" id={props.id} onClick={() => props.callback([props.direct])}>{props.label}</button>
)
}

export default TurnPageButton;