import { useState , useEffect } from "react";
import React from "react";
import { Link } from "react-router-dom";
import "./App.css"; // Assuming the CSS file is in the same directory

const Home = () => {
  const [login, setLogin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setLogin(!!token); 
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('UserName');
    setLogin(false);
  };
  return (
    <div className="home-page">
      <nav>
            <ul>
              <li><Link to="/home">Home</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/cart">Cart</Link></li>
              <li><Link to="/checkout">Checkout</Link></li>
              <li><Link to="/login">Logout</Link></li>

            </ul>
          </nav>
      <h1 className="home-title">                Welcome to the Grocery Store!              </h1>
      <p className="home-text">
        Start shopping now by visiting the{" "}
        <Link to="/products" className="home-link">
          Products
        </Link>{" "}
        page.
      </p>
    </div>
  );
};

export default Home;

