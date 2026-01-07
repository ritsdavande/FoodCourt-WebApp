import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./components/ContextReducer";

// Import screens/pages (these should include Navbar at their top)
import Home from "./screens/Home";
import Cart from "./screens/Cart";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import MyOrder from "./screens/MyOrder";
import ForgotPassword from "./screens/ForgotPassword";
// Add additional screens if needed

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/myorders" element={<MyOrder />} />
          <Route path="/resetpassword" element={<ForgotPassword />} />
          {/* Add other routes as needed */}
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
