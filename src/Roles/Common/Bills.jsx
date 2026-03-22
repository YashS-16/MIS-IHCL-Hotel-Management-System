import { useNavigate } from "react-router-dom";
import "../../Styles/bill.css";

function Bill({ bookings }) {
  const navigate = useNavigate();

  // Get latest booking (important UX improvement)
  const latestBooking = bookings[bookings.length - 1];

  if (!latestBooking) {
    return <p>No bill available</p>;
  }

  return (
    <div className="bill-page">
      <div className="bill-card">

        {/* HEADER */}
        <div className="bill-header">
          <h2>TAJ HOTEL</h2>
          <p>Invoice</p>
        </div>

        {/* CUSTOMER INFO */}
        <div className="bill-section">
          <h4>Customer Details</h4>
          <p><strong>Name:</strong> {latestBooking.customerName}</p>
          <p><strong>Email:</strong> {latestBooking.email || "N/A"}</p>
        </div>

        {/* ROOM INFO */}
        <div className="bill-section">
          <h4>Booking Details</h4>
          <p>Room {latestBooking.roomNo} • {latestBooking.roomTyp}</p>
          <p>Check-In: {latestBooking.checkIn || "N/A"}</p>
          <p>Check-Out: {latestBooking.checkOut || "N/A"}</p>
        </div>

        {/* PAYMENT INFO */}
        <div className="bill-section">
          <h4>Payment</h4>
          <p>
            Status: 
            <span className={`badge ${latestBooking.paymentStatus === "Paid" ? "green" : "orange"}`}>
              {latestBooking.paymentStatus}
            </span>
          </p>

          <p>Method: {latestBooking.paymentMethod || "—"}</p>
        </div>

        {/* TOTAL */}
        <div className="bill-total-box">
          <span>Total Amount</span>
          <h3>₹{latestBooking.amount}</h3>
        </div>

        {/* ACTION */}
        <button className="bill-btn" onClick={() => navigate("/")}>
          Back to Home
        </button>

      </div>
    </div>
  );
}

export default Bill;