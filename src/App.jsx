import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import HomePg from './components/HomePg.jsx'
import Login from './Login.jsx'
import Admin from './Roles/Admin/Admin.jsx';
import Reception from './Roles/Reception/Reception.jsx';
import Customer from './Roles/Customer/Customer.jsx';
import ManageRooms from './Roles/Admin/ManageRooms.jsx';
import ViewBookings from './Roles/Admin/ViewBookings.jsx';
import ManageStaff from './Roles/Admin/ManageStaff.jsx';
import Payment from './Roles/Common/Payment.jsx';
import Bill from './Roles/Common/Bills.jsx';


function App() {
  const [rooms, setRooms] = useState(() => {
    const saved = localStorage.getItem("rooms");
    return saved ? JSON.parse(saved) : [];
  });

  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem("bookings");
    return saved ? JSON.parse(saved) : [];
  });

  // Save Rows
  useEffect(() => {
    localStorage.setItem("rooms", JSON.stringify(rooms));
  }, [rooms]);

  useEffect(() => {
    localStorage.setItem("bookings", JSON.stringify(bookings));
  }, [bookings]);


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePg/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin rooms={rooms} bookings={bookings} />} />
          <Route path="/admin/rooms" element={<ManageRooms rooms={rooms} setRooms={setRooms} />} />
          <Route path="/admin/bookings" element={<ViewBookings bookings={bookings} setBookings={setBookings} rooms={rooms} setRooms={setRooms} />} />
          <Route path="/admin/staff" element={<ManageStaff />} />

          <Route path="/reception" element={<Reception
            rooms={rooms}
            setRooms={setRooms}
            bookings={bookings}
            setBookings={setBookings} />} />
            
          <Route path="/customer" element={<Customer 
            rooms={rooms}
            setRooms={setRooms}
            bookings={bookings}
            setBookings={setBookings} />} />
          <Route path='/payment' element={ <Payment bookings={bookings} setBookings={setBookings}/> }/>
          <Route path='/bill' element={ <Bill bookings={bookings} /> }/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
