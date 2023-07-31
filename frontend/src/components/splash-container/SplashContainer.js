import "./SplashContainer.css";
import FormContainer from "../form-container/FormContainer"
import HomeButton from "../home-button/HomeButton";
import { useNavigate } from "react-router";

const SplashContainer = (props) => {
  return (
    <>
    <HomeButton/>
    <div className="splash-container">
      <div className="splash-grid">
        <div className="welcome-text-container">
        Sem. Pellentesque Quisque ac nec leo taciti, metus tellus justo. Interdum nam mus dis mauris sodales. Ridiculus dapibus ornare sociis sociis. Pulvinar sed condimentum nostra etiam purus dolor nisi, ante. Urna libero diam dui. Rutrum, sodales faucibus Velit eget aptent nec rutrum at, adipiscing augue. Ultricies aenean, porttitor bibendum ante. Cubilia dolor tincidunt iaculis libero arcu etiam eu volutpat Enim penatibus ultrices ligula neque. Diam adipiscing pulvinar sapien posuere.

Pede etiam nullam porta conubia. At ridiculus platea penatibus. Elit. Accumsan dis lacinia est commodo in. Cras magna quisque pellentesque. Dictum venenatis turpis ultrices ullamcorper imperdiet neque aptent. Ligula. Turpis luctus hymenaeos auctor porttitor accumsan tellus ornare in tellus mi sodales sapien massa pede tellus neque convallis ornare eu platea aliquam tortor. Suspendisse praesent iaculis mollis, amet.
        </div>
        <FormContainer  navigate={ useNavigate() }/>
      </div>
    </div>
    </>
  )
}

export default SplashContainer;