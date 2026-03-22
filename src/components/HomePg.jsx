import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "../Styles/home.css";
import Navbar from '../components/Navbar.jsx';

function HomePg() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const user = localStorage.getItem("user");

  useEffect(() => {
    if (!role) navigate("/");
  }, [role, navigate]);

  return (
    <div className="home-page">

      <Navbar/>

      <div className="home-container">

        {/* HERO SECTION */}
        <div className="home-hero">
          <h1>TAJ MANAGEMENT SYSTEM</h1>
          <p>Welcome {user || "Guest"} • {role}</p>
        </div>

        {/* ROLE BASED ACTIONS */}
        <div className="home-grid">

          {role === "admin" && (
            <>
              <div className="home-card" onClick={() => navigate("/admin")}>
                <h3>Admin Panel</h3>
                <p>Manage rooms & bookings</p>
              </div>
            </>
          )}

          {role === "reception" && (
            <div className="home-card" onClick={() => navigate("/reception")}>
              <h3>Reception Desk</h3>
              <p>Handle check-ins & bookings</p>
            </div>
          )}

          {role === "customer" && (
            <div className="home-card" onClick={() => navigate("/customer")}>
              <h3>Book Rooms</h3>
              <p>Explore available rooms</p>
            </div>
          )}

        </div>

        {/* INFO SECTION */}
        <div className="home-info">
          <h3>Why Taj?</h3>
          <div className="info-grid">
            <div>✔ Premium Rooms</div>
            <div>✔ Seamless Booking</div>
            <div>✔ Trusted Service</div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default HomePg;