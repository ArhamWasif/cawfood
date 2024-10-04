import React, { useState, useRef, useEffect } from 'react';
import { useDispatchCart, useCart } from './ContextReducer';
import { useNavigate } from 'react-router-dom';
import './Cards.css';

export default function Cards(props) {
  let navigate = useNavigate();
  const priceRef = useRef();
  let dispatch = useDispatchCart();
  let data = useCart();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState('');
  
  let options = props?.options;
  let foodItem = props?.foodItem;
  let priceOptions = Object.keys(options || {});
  
  const handleClick = () => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
  }

  const handleQty = (e) => {
    setQty(e.target.value);
  }

  const handleOptions = (e) => {
    setSize(e.target.value);
  }

  const handleAddToCart = async () => {
    let food = data.find(item => item.id === foodItem._id);
    
    if (food && food.size === size) {
      await dispatch({ type: 'UPDATE', id: foodItem._id, price: finalPrice, qty });
    } else {
      await dispatch({ type: 'ADD', id: foodItem._id, name: foodItem.name, price: finalPrice, qty, size, img: foodItem.img });
      console.log('Added to cart:', foodItem.name);
    }
  }

  let finalPrice = qty * parseInt(options[size] || 0);

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  return (
    <div>
      <div className="card-container">
        <div className="card mt-3">
          <img
            src={`http://localhost:5000/api/image/${props.foodItem.img.split('').slice(8).join('')}`}
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{foodItem.name}</h5>

            <div className="input-container">
              <select
                className="quantity-select"
                onClick={handleClick}
                onChange={handleQty}
              >
                {Array.from(Array(6), (e, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
              <select
                className="price-select"
                ref={priceRef}
                onClick={handleClick}
                onChange={handleOptions}
              >
                {priceOptions.map((i) => (
                  <option key={i} value={i}>
                    {i}
                  </option>
                ))}
              </select>
              <div className="price-text">Rs.{finalPrice}/-</div>
            </div>
            <hr />
            <button
              className="add-to-cart-btn"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
