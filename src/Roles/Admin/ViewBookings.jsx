import React from 'react'
import Layout from '../../components/Layout';
import '../../Styles/admin.css'

function ViewBookings({ bookings, setBookings, rooms, setRooms }) {

    const handleCheckIn = (index) => {
        const updated = bookings.map((b, i) =>
            i === index ? { ...b, status: "Checked-In" } : b
        );

        setBookings(updated);
    };

    const handleCheckOut = (index) => {
        const booking = bookings[index];

        // update booking status
        const updatedBookings = bookings.map((b, i) =>
            i === index ? { ...b, status: "Checked-Out" } : b
        );

        setBookings(updatedBookings);

        // free the room again
        const updatedRooms = rooms.map(room =>
            room.number == booking.roomNo
                ? { ...room, available: true }
                : room
        );

        setRooms(updatedRooms);
    };

    return (
  <div className="admin-page">
  <div className="admin-card">

    <h2>Bookings</h2>

    {bookings.length === 0 ? (
      <p className="empty">No bookings yet</p>
    ) : (
      <div className="table">

        {bookings.map((b, index) => (
          <div className="table-row" key={index}>

            <div>
              <strong>{b.customerName}</strong>
              <p className="sub">
                Room {b.roomNo} • {b.roomTyp}
              </p>
            </div>

            <div className="badges">
              <span className="badge blue">{b.status}</span>
              <span className="badge gray">{b.paymentStatus}</span>
            </div>

            <div className="actions">
              <button onClick={() => handleCheckIn(index)}>
                Check-In
              </button>

              <button
                className="danger-btn"
                onClick={() => handleCheckOut(index)}
              >
                Check-Out
              </button>
            </div>

          </div>
        ))}

      </div>
    )}

  </div>
</div>
);
}

export default ViewBookings