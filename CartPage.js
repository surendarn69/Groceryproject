import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [login, setLogin] = useState(false);

  useEffect(() => {
    // Check login token
    const token = localStorage.getItem("token");
    setLogin(!!token);

    // Load cart data from localStorage
    const storedCart = JSON.parse(localStorage.getItem("cart") || "{}");
    setCart(Object.values(storedCart)); // Convert the object to an array
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("UserName");
    setLogin(false);
  };

  const handleQuantityChange = (productId, increment) => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "{}");
    const updatedCart = { ...storedCart };

    if (updatedCart[productId]) {
      updatedCart[productId].count = Math.max(1, updatedCart[productId].count + increment);
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(Object.values(updatedCart)); // Update the cart state
  };

  const handleRemove = (productId) => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "{}");
    const updatedCart = { ...storedCart };

    delete updatedCart[productId]; // Remove item by key

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(Object.values(updatedCart)); // Update the cart state
  };

  const handleClearCart = () => {
    localStorage.removeItem("cart");
    setCart([]); // Reset cart state
  };

  return (
    <>
      <nav>
        <ul>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/cart">Cart</Link></li>
          <li><Link to="/checkout">Checkout</Link></li>
          <li><Link to="/login">Logout</Link></li>

        </ul>
      </nav>
      <div className="cart-page">
        <h2>Your Cart</h2>
        {cart.length === 0 ? (
          <p>
            Your cart is empty. Go back to <Link to="/products">shop</Link>.
          </p>
        ) : (
          <div>
            <ul className="cart-list">
              {cart.map((item) => (
                <li key={item._id} className="cart-item">
                  <img src={item.imageUrl} alt={item.name} className="cart-item-img" />
                  <div className="cart-item-info">
                    <h3>{item.name}</h3>
                    <p>${item.price}</p>
                    <div className="quantity-controls">
                      <button onClick={() => handleQuantityChange(item._id, -1)}>-</button>
                      <input type="number" value={item.count} readOnly />
                      <button onClick={() => handleQuantityChange(item._id, 1)}>+</button>
                    </div>
                  </div>
                  <button className="remove-btn" onClick={() => handleRemove(item._id)}>Remove</button>
                </li>
              ))}
            </ul>
            <div className="cart-summary">
              <button className="clear-btn" onClick={handleClearCart}>Clear Cart</button>
              <p>
                Total: ${cart.reduce((total, item) => total + item.price * item.count, 0).toFixed(2)}
              </p>
              <Link to="/checkout">
                <button className="checkout-btn">Proceed to Checkout</button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartPage;
