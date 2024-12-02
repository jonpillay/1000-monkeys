import "./TurnPageButton.css"

import ForwardButton from "../../../img/forwards_arrow2.png"
import BackButton from "../../../img/back_arrow2.png"

const TurnPageButton = (props) => {

  return (
    <input src={props.direct == "next" ? ForwardButton : BackButton} type="image" className="turn-page-button" id={props.id} onClick={() => props.callback([props.direct])}></input>
  )
}

export default TurnPageButton;