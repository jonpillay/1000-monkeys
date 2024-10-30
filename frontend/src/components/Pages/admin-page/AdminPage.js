import "./AdminPage.css";
import CreateUserForm from "../../AdminPageParts/create-user-form/CreateUserForm";
import UpdateUserForm from "../../AdminPageParts/update-user-form/UpdateUserForm";
import { useNavigate } from "react-router";

const AdminPage = (props) => {
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

export default AdminPage;