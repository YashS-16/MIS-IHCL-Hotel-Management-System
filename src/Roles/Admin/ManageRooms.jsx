import React, { useState } from 'react';
import '../../Styles/admin.css'

function ManageRooms({rooms, setRooms}) {
    const [roomNumber, setRoomNumber] = useState('');
    const [roomType, setRoomType] = useState('Deluxe');
    const [roomPrice, setRoomPrice] = useState("");

    const addRoom = () => {
        if (!roomNumber) {
            alert("Enter room number");
            return;
        }

        const newRoom = {
            number: roomNumber,
            type: roomType,
            price: Number(roomPrice),
            available: true
        };

        setRooms([...rooms, newRoom]);
        setRoomNumber('');
        setRoomType('Deluxe')
        setRoomPrice("")
    };

    const deleteRoom = (index) => {
        const updatedRooms = rooms.filter((_, i) => i !== index);
        setRooms(updatedRooms);
    };

    return (
  <div className="admin-page">
  <div className="admin-card">

    <h2>Manage Rooms</h2>

    <div className="form-row">
      <input
        placeholder="Room Number"
        value={roomNumber}
        onChange={(e) => setRoomNumber(e.target.value)}
      />

      <select
        value={roomType}
        onChange={(e) => setRoomType(e.target.value)}
      >
        <option value="Deluxe">Deluxe</option>
        <option value="Suite">Suite</option>
      </select>

      <input
        placeholder="Price"
        value={roomPrice}
        onChange={(e) => setRoomPrice(e.target.value)}
      />
    </div>

    <button className="primary-btn" onClick={addRoom}>
      + Add Room
    </button>

    {/* ROOM TABLE */}
    <div className="table">
      {rooms.map((room, index) => (
        <div className="table-row" key={index}>
          <span>#{room.number}</span>
          <span>{room.type}</span>
          <span>₹{room.price}</span>
          <span className={room.available ? "badge green" : "badge red"}>
            {room.available ? "Available" : "Occupied"}
          </span>

          <button
            className="danger-btn"
            onClick={() => deleteRoom(index)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>

  </div>
</div>
);
}

export default ManageRooms;