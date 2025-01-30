import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import { CartProvider } from './CartContext';  
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import ProductList from './ProductList';
import CartPage from './CartPage';
import CheckoutPage from './CheckoutPage';
import './App.css';

function App() {


  return (
    <CartProvider>
      <Router>
        <div>
          {/* Routes */}
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Signup />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
