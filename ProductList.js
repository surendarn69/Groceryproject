import React, { useState, useEffect } from "react";
import "./App.css";
import { Link } from "react-router-dom";

// Static mock data for products
const mockProducts = [
  {
    _id: "1",
    name: "ABC malt",
    description:
      "Organic ABC malt is a nutrient-rich blend crafted from organic grains, offering wholesome energy and natural goodness.",
    price: 19.99,
    imageUrl: "https://m.media-amazon.com/images/I/81yVWsbv73L._SX679_.jpg",
  },
  {
    _id: "2",
    name: "Black Pepper",
    description:
      "Organic black pepper is a premium, chemical-free spice known for its bold flavor and rich aroma.",
    price: 29.99,
    imageUrl:
      "https://www.liveorganic.co.in/cdn/shop/products/ORGANIC_BLACK_PAPPER_WHOLE.png?v=1655444907",
  },
  {
    _id: "3",
    name: "Chakki Atta ",
    description:
      "Organic chakki atta is a wholesome, stone-ground whole wheat flour, rich in fiber and natural nutrients.",
    price: 199.99,
    imageUrl:
      "https://5.imimg.com/data5/SELLER/Default/2024/1/375370760/TQ/RE/VU/72530250/atta-1000x1000.jpg",
  },
  {
    _id: "4",
    name: "Palm jaggery 1",
    description:
      "Organic palm jaggery is a natural, unrefined sweetener made from palm sap, rich in minerals and earthy sweetness.",
    price: 49.99,
    imageUrl:
      "https://thinaiorganics.com/wp-content/uploads/2022/02/PURE-ORGANIC-PALM-JAGGERY-min-768x769.jpg",
  },
  {
    _id: "5",
    name: "Cocunut oil",
    description:
      "Organic coconut is a naturally grown superfood, valued for its rich flavor, hydration, and versatile health benefits.",
    price: 59.99,
    imageUrl:
      " https://cdn.shopify.com/s/files/1/2555/5368/products/9_2048x.png?v=1647457638",
  },
];

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [login, setLogin] = useState(false);

  // Simulate fetching products
  useEffect(() => {
    const fetchProducts = () => {
      const token = localStorage.getItem("token");
      setLogin(!!token);
      try {
        setTimeout(() => {
          setProducts(mockProducts);
          setLoading(false);
        }, 1);
      } catch (err) {
        setError("Failed to load products");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || {};
    const productId = product._id;

    if (cart[productId]) {
      // If product already in cart, increase the count
      cart[productId].count += 1;
    } else {
      // If product not in cart, add it with count 1
      cart[productId] = {
        ...product,
        count: 1,
      };
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} added to cart!`);
  };

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("UserName");
    setLogin(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>
            <Link to="/cart">Cart</Link>
          </li>
          <li>
            <Link to="/checkout">Checkout</Link>
          </li>
          <li><Link to="/login">Logout</Link></li>

        </ul>
      </nav>
      <div className="main-content">
        <h2>Products</h2>
        <div className="product-list">
          {products.map((product) => (
            <div key={product._id} className="product-item">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="product_item_img"
              />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p className="price">₹{product.price.toFixed(2)}</p>
              <button onClick={() => handleAddToCart(product)}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductList;
