import "./AdminPanel.css";
import CreateUserForm from "../create-user-form/CreateUserForm";
import UpdateUserForm from "../update-user-form/UpdateUserForm";
import HomeButton from "../home-button/HomeButton";
import { useNavigate } from "react-router";

const AdminPanel = (props) => {
  return (
    <>
    <HomeButton/>
    <div className="admin-container">
      <div className="admin-grid">
        <CreateUserForm/>
        <UpdateUserForm/>
      </div>
    </div>
    </>
  )
}

export default AdminPanel;