import { useNavigate } from "react-router-dom";
import "../Styles/nav.css";

function Navbar() {
  const navigate = useNavigate();

  const role = localStorage.getItem("role");
  const isLoggedIn = !!role; // ✅ check login

  return (
    <div className="navbar">

      <h2 className="logo" onClick={() => navigate("/home")}>
        TAJ
      </h2>

      <div className="nav-links">

        {/* Role-based buttons (only if logged in) */}
        {isLoggedIn && role === "admin" && (
          <button onClick={() => navigate("/admin")}>Admin</button>
        )}

        {isLoggedIn && role === "reception" && (
          <button onClick={() => navigate("/reception")}>Reception</button>
        )}

        {isLoggedIn && role === "customer" && (
          <button onClick={() => navigate("/customer")}>Rooms</button>
        )}

        {/* {isLoggedIn && <span className="user-name">👤 {user}</span>} */}
        {/* 🔥 LOGIN / LOGOUT SWITCH */}
        {isLoggedIn ? (
          <button
            onClick={() => {
              localStorage.clear();
              navigate("/");
            }}
          >
            Logout
          </button>
        ) : (
          <button onClick={() => navigate("/login")}>
            Login
          </button>
        )}

      </div>

    </div>
  );
}

export default Navbar;