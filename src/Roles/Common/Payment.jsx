import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../Styles/pay.css";

function Payment({ bookings, setBookings }) {
  const navigate = useNavigate();

  const [paymentData, setPaymentData] = useState({});
  const [errorIndex, setErrorIndex] = useState(null);
  const [successIndex, setSuccessIndex] = useState(null);

  const handlePayment = (index) => {
    const method = paymentData[index]?.method || "UPI";
    const upiId = paymentData[index]?.upiId;

    if (method === "UPI" && !upiId) {
      setErrorIndex(index);
      return;
    }

    setErrorIndex(null);

    const updated = bookings.map((b, i) =>
      i === index
        ? {
          ...b,
          paymentStatus: "Paid",
          paymentMethod: method
        }
        : b
    );

    setBookings(updated);

    //SHOW SUCCESS UI INSTEAD OF REDIRECT
    setSuccessIndex(index);
  };

  return (
    <div className="payment-page">
      <div className="payment-card">

        <div className="payment-header">
          <h2>Complete Payment</h2>
          <p>Secure your booking</p>
        </div>

        {bookings.map((b, index) => (
          <div key={index} className="payment-item">
            {/* Booking Info */}
            <div className="booking-info">
              <h4>{b.customerName}</h4>
              <p className="sub">
                Room {b.roomNo} • {b.roomTyp}
              </p>
            </div>

            {/* Amount */}
            <div className="amount-box">
              ₹{b.amount}
            </div>

            {/* Status */}
            <span
              className={`status-badge ${
                b.paymentStatus === "Paid" ? "green" : "orange"
              }`}
            >
              {b.paymentStatus}
            </span>

            {/* Payment Method */}
            <div className="payment-methods">
              {["UPI", "Card", "Cash"].map((type) => (
                <label key={type}>
                  <input
                    type="radio"
                    value={type}
                    checked={
                      (paymentData[index]?.method || "UPI") === type
                    }
                    onChange={(e) =>
                      setPaymentData({
                        ...paymentData,
                        [index]: {
                          ...paymentData[index],
                          method: e.target.value,
                        },
                      })
                    }
                  />
                  {type}
                </label>
              ))}
            </div>

            {/* UPI Input */}
            {(paymentData[index]?.method || "UPI") === "UPI" && (
              <input
                className="payment-input"
                placeholder="Enter UPI ID"
                value={paymentData[index]?.upiId || ""}
                onChange={(e) =>
                  setPaymentData({
                    ...paymentData,
                    [index]: {
                      ...paymentData[index],
                      upiId: e.target.value,
                    },
                  })
                }
              />
            )}

            {/* Error */}
            {errorIndex === index && (
              <p className="error">Enter UPI ID</p>
            )}

            {/* SUCCESS UI */}
            {successIndex === index && (
              <div className="success-box">
                <h4>Payment Successful</h4>
                <button onClick={() => navigate("/home")}>
                  Go to Home
                </button>
                <button onClick={() => navigate("/bill")}>
                  View Bill
                </button>
              </div>
            )}

            {/* Pay Button */}
            <button 
            className="pay-btn"
            onClick={() => handlePayment(index)}>
              Pay Now
            </button>
          </div>
        ))}

          </div>
      
    </div>
      );
}

      export default Payment;