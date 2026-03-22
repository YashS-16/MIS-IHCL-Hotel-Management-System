import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  return (
    <div>
      <h3>TAJ System</h3>

      <button onClick={() => navigate("/admin")}>Dashboard</button>
      <button onClick={() => navigate("/admin/rooms")}>Manage Rooms</button>
      <button onClick={() => navigate("/admin/bookings")}>Bookings</button>
      <button onClick={() => navigate("/admin/staff")}>Staff</button>
    </div>
  );
}

export default Sidebar;