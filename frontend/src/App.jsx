import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { useState } from "react";
import Login from "./components/Login";
import Cart from "./pages/Cart";
import Placeorder from "./pages/Placeorder";
import { ToastContainer } from "react-toastify";

function App() {

  const[showLogin , setShowLogin] = useState(false);

  return (
  <>
  {showLogin ? <Login setShowLogin={setShowLogin} /> : <></>}
  <Navbar setShowLogin={setShowLogin} />
  <ToastContainer position="top-right" autoClose={3000} />
     

  <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/cart" element={<Cart />} />
  <Route path="/orders" element={<Placeorder />} />
</Routes>
  

  </>
     
  );
}

export default App;
