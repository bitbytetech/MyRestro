import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { removeFromCart, clearCart } from '../redux/cartSlice';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { items } = useSelector((state: RootState) => state.cart);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handlePlaceOrder = async () => {
    if (!isAuthenticated) {
      alert('Please login to place an order');
      navigate('/login');
      return;
    }

    try {
      await api.post('/orders/', {
        items: items.map((i) => ({
          food_variant_id: i.variant_id,
          quantity: i.quantity,
        })),
      });
      alert('Order placed successfully!');
      dispatch(clearCart());
      navigate('/');
    } catch (err) {
      alert('Error placing order');
    }
  };

  if (items.length === 0) {
    return <div style={{ textAlign: 'center', marginTop: '50px' }}><h2>Your cart is empty</h2></div>;
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h1>Review Your Invoice</h1>
      <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        {items.map((item) => (
          <div key={item.variant_id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #eee' }}>
            <div>
              <strong>{item.name}</strong> ({item.variant_name}) x {item.quantity}
            </div>
            <div>
              <strong>${(item.price * item.quantity).toFixed(2)}</strong>
              <button 
                onClick={() => dispatch(removeFromCart(item.variant_id))}
                style={{ marginLeft: '10px', color: 'red', background: 'none' }}
              >
                ✕
              </button>
            </div>
          </div>
        ))}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', fontSize: '20px' }}>
          <strong>Total:</strong>
          <strong style={{ color: '#e63946' }}>${total.toFixed(2)}</strong>
        </div>
        <button 
          className="primary" 
          style={{ width: '100%', marginTop: '20px', padding: '15px' }}
          onClick={handlePlaceOrder}
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;
