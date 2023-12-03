import { NavLink } from "react-router-dom"
import "./navbutton.css"

function NavButton(props) {
  const callback = props.callback;
  const value = props.value;

  return (
    <NavLink onClick={callback} className="nav-button">{value}</NavLink>
  )
}

export default NavButton;