import { Link, NavLink } from "react-router-dom"
import "./navbutton.css"

function NavButton(props) {
  const to = props.to;
  const value = props.value;

  return (
    <button to={to} className="nav-button">{value}</button>
  )
}

export default NavButton;