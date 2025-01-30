import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./App.css";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [cartTotal, setCartTotal] = useState(0);
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [login, setLogin] = useState(false);

  useEffect(() => {
    // Check login token
    const token = localStorage.getItem("token");
    setLogin(!!token);

    // Calculate total from localStorage cart
    const cart = JSON.parse(localStorage.getItem("cart") || "{}");
    const total = Object.values(cart).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );
    setCartTotal(total.toFixed(2)); // Set total with two decimals
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("UserName");
    setLogin(false);
  };

  const handlePayment = async () => {
    if (!name || !cardNumber || !cvv) {
      alert("Please fill in all fields!");
      return;
    }

    const transactionData = {
      name,
      cardNumber,
      cvv,
      total: cartTotal,
    };

    try {
      const response = await fetch("http://localhost:3001/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transactionData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Payment successful! Thank you for your purchase.");
        localStorage.removeItem("cart"); // Clear the cart after payment
        navigate('/products')
      } else {
        alert(`Payment failed: ${data.message}`);
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      alert("An error occurred while processing your payment.");
    }
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
      <div className="checkout-page">
        <h2 className="checkout-title">Checkout</h2>
        <p className="checkout-description">
          Review your order and proceed to payment.
        </p>
        <p>Total: <strong>${cartTotal}</strong></p>
        <form className="payment-form">
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="cardNumber">Card Number</label>
            <input
              type="text"
              id="cardNumber"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="cvv">CVV</label>
            <input
              type="password"
              id="cvv"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="checkout-button"
            onClick={handlePayment}
          >
            Complete Payment
          </button>
        </form>
      </div>
    </>
  );
};

export default CheckoutPage;
