import "./AdminPanel.css";
import CreateUserForm from "../../create-user-form/CreateUserForm";
import UpdateUserForm from "../../update-user-form/UpdateUserForm";
import { useNavigate } from "react-router";

const AdminPanel = (props) => {
  return (
    <>
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