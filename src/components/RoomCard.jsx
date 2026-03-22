import React from "react";
import "../Styles/customer.css";

function RoomCard({ room, onBook }) {
  return (
    <div className={`room-card ${!room.available ? "disabled" : ""}`}>

      {/* Header */}
      <div className="room-header">
        <h4>Room {room.number}</h4>
        <span className={`status-badge ${room.available ? "green" : "red"}`}>
          {room.available ? "Available" : "Occupied"}
        </span>
      </div>

      {/* Body */}
      <div className="room-body">
        <p className="room-type">{room.type}</p>
        <p className="room-price">₹{room.price}</p>
      </div>

      {/* Footer */}
      <button
        className="room-btn"
        onClick={() => onBook(room)}
        disabled={!room.available}
      >
        {room.available ? "Book Now" : "Not Available"}
      </button>

    </div>
  );
}

export default RoomCard;