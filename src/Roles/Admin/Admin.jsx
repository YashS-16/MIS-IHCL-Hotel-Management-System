import '../../Styles/admin.css'
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";

function Admin({ rooms, bookings }) {
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");

    if (role !== "admin") {
      navigate("/");
    }
  }, []);

  return (
    <div className="admin-page">
  <div className="admin-card">

    <div className="admin-header">
      <h1>Admin Dashboard</h1>
      <p>Overview of hotel operations</p>
    </div>

    <div className="stats-grid">
      <div className="stat-box">
        <h3>{rooms.length}</h3>
        <p>Total Rooms</p>
      </div>

      <div className="stat-box">
        <h3>{rooms.filter(r => r.available).length}</h3>
        <p>Available</p>
      </div>

      <div className="stat-box">
        <h3>{bookings.length}</h3>
        <p>Bookings</p>
      </div>
    </div>

    <div className="admin-actions">
      <button onClick={() => navigate('/admin/rooms')}>
        Manage Rooms
      </button>

      <button onClick={() => navigate('/admin/bookings')}>
        View Bookings
      </button>
    </div>

    <button
      className="logout-btn"
      onClick={() => {
        localStorage.removeItem("role");
        navigate("/");
      }}
    >
      Logout
    </button>

  </div>
</div>
  );
}

export default Admin;