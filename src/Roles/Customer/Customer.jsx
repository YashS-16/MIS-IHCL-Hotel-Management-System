import "../../Styles/customer.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RoomCard from "../../components/RoomCard";

function Customer({ rooms, setRooms, bookings, setBookings }) {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "customer") navigate("/");
  }, []);

  const handleBooking = (room) => {
    if (!name) {
      setError("Please enter your name to continue");
      return;
    }

    setError("");

    const newBooking = {
      customerName: name,
      contact: contact,
      roomNo: room.number,
      roomTyp: room.type,
      status: "Booked",
      amount: room.price,
      paymentStatus: "Pending",
      paymentMethod: "",
    };

    setBookings([...bookings, newBooking]);

    const updatedRooms = rooms.map((r) =>
      r.number === room.number ? { ...r, available: false } : r
    );

    setRooms(updatedRooms);

    navigate("/payment");
  };

  const userBookings = bookings.filter(
    (b) => b.customerName === name
  );

  return (
    <div className="customer-page">
      <div className="customer-card">

        {/* HEADER */}
        <div className="customer-header">
          <h1>Welcome</h1>
          <p>Book your stay easily</p>
        </div>

        {/* USER INPUT */}
        <div className="customer-section">
          <h3>Your Details</h3>

          <div className="input-row">
            <input
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            
            <input
              placeholder="Contact Number"
              type="tel"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
          </div>

          {error && <p className="error">{error}</p>}
        </div>

        {/* ROOMS */}
        <div className="customer-section">
          <div className="section-header">
            <h3>Available Rooms</h3>
            <span>{rooms.filter(r => r.available).length} rooms</span>
          </div>

          <div className="room-grid">
            {rooms.filter(r => r.available).length === 0 ? (
              <p className="empty">No rooms available</p>
            ) : (
              rooms
                .filter((r) => r.available)
                .map((room) => (
                  <RoomCard
                    key={room.number}
                    room={room}
                    onBook={handleBooking}
                  />
                ))
            )}
          </div>
        </div>

        {/* BOOKINGS */}
        {/* <div className="customer-section">
          <h3>Your Bookings</h3>

          {userBookings.length === 0 ? (
            <p className="empty">No bookings yet</p>
          ) : (
            <div className="booking-list">
              {userBookings.map((b, index) => (
                <div key={index} className="booking-card">

                  <div>
                    <strong>Room {b.roomNo}</strong>
                    <p className="sub">{b.roomTyp}</p>
                  </div>

                  <div className="booking-info">
                    <span className="badge blue">{b.status}</span>
                    <span className="badge gray">
                      ₹{b.amount}
                    </span>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div> */}

      </div>
    </div>
  );
}

export default Customer;