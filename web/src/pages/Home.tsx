import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import api from '../services/api';
import { addToCart } from '../redux/cartSlice';

const Home = () => {
  const [items, setItems] = useState<any[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await api.get('/menu/');
        setItems(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMenu();
  }, []);

  const handleAddToCart = (item: any, variant: any) => {
    dispatch(addToCart({
      food_item_id: item.id,
      variant_id: variant.id,
      name: item.name,
      variant_name: variant.name,
      price: variant.price,
      quantity: 1
    }));
  };

  return (
    <div>
      <h1>Menu</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
        {items.map((item) => (
          <div key={item.id} style={{ backgroundColor: '#fff', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            {item.variants.map((v: any) => (
              <div key={v.id} style={{ display: 'flex', justifyContent: 'space-between', margin: '5px 0', alignItems: 'center' }}>
                <span>{v.name} - <strong>${v.price}</strong></span>
                <button 
                  className="primary" 
                  style={{ padding: '5px 10px' }}
                  onClick={() => handleAddToCart(item, v)}
                >
                  Add
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
