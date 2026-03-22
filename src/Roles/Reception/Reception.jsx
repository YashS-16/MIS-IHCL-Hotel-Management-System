import "../../Styles/receptio.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Reception({ rooms, setRooms, bookings, setBookings }) {
  const navigate = useNavigate();

  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [roomNo, setRoomNo] = useState("");
  const [roomTyp, setRoomTyp] = useState("—");
  const [price, setPrice] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [error, setError] = useState("");

  const availableRooms = rooms.filter((r) => r.available);

  const handleBooking = () => {
    if (!customerName || !roomNo || !checkIn || !checkOut) {
      setError("Please fill all required fields");
      return;
    }

    setError("");

    const selectedRoom = rooms.find((r) => r.number == roomNo);

    const newBooking = {
      customerName,
      email,
      roomNo,
      roomTyp: selectedRoom.type,
      checkIn,
      checkOut,
      status: "Booked",
      amount: selectedRoom.price,
      paymentStatus: "Pending",
      paymentMethod: "",
    };

    setBookings([...bookings, newBooking]);

    const updatedRooms = rooms.map((room) =>
      room.number == roomNo ? { ...room, available: false } : room
    );

    setRooms(updatedRooms);

    navigate("/payment");

    // Reset
    setCustomerName("");
    setEmail("");
    setRoomNo("");
    setRoomTyp("—");
    setPrice("");
    setCheckIn("");
    setCheckOut("");
  };

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "reception") navigate("/");
  }, []);

  return (
    <div className="page">
      <div className="card">

        <div className="header">
          <h2>Reception Dashboard</h2>
          <p>Manage bookings efficiently</p>
        </div>

        {/* Customer Info */}
        <div className="section">
          <h3>Customer Info</h3>

          <input
            type="text"
            placeholder="Customer Name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Booking Info */}
        <div className="section">
          <h3>Room Selection</h3>

          <select
            value={roomNo}
            onChange={(e) => {
              const selected = rooms.find(
                (r) => r.number == e.target.value
              );

              setRoomNo(e.target.value);
              setRoomTyp(selected?.type || "—");
              setPrice(selected?.price || "");
            }}
          >
            <option value="">Select Room</option>
            {availableRooms.map((room) => (
              <option key={room.number} value={room.number}>
                Room {room.number} — ₹{room.price}
              </option>
            ))}
          </select>

          <div className="room-preview">
            <span>Type: {roomTyp}</span>
            <span> <b>Price: {price ? `₹${price}` : "—"}</b></span>
          </div>
        </div>

        {/* Stay Details */}
        <div className="section">
          <h3>Stay Duration</h3>

          <div className="date-row">
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>
        </div>

        {error && <p className="error-text">{error}</p>}

        {/* Actions */}
        <button className="primary-btn" onClick={handleBooking}>
          Confirm Booking
        </button>

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

export default Reception;