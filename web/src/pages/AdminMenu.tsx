import React, { useState, useEffect } from 'react';
import api from '../services/api';

const AdminMenu = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [variantName, setVariantName] = useState('Full');
  const [menu, setMenu] = useState<any[]>([]);

  const fetchMenu = async () => {
    const res = await api.get('/menu/');
    setMenu(res.data);
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/menu/', {
        name,
        description,
        images: [],
        variants: [{ name: variantName, price: parseFloat(price) }]
      });
      setName('');
      setDescription('');
      setPrice('');
      fetchMenu();
    } catch (err) {
      alert('Error creating item');
    }
  };

  return (
    <div>
      <h1>Admin Menu Management</h1>
      <form onSubmit={handleCreate} style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
        <h3>Add New Item</h3>
        <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <div style={{ display: 'flex', gap: '10px' }}>
          <input placeholder="Variant (e.g. Full)" value={variantName} onChange={(e) => setVariantName(e.target.value)} />
          <input placeholder="Price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </div>
        <button type="submit" className="primary">Add Item</button>
      </form>

      <h2>Current Menu</h2>
      <div style={{ backgroundColor: '#fff', borderRadius: '8px' }}>
        {menu.map((item) => (
          <div key={item.id} style={{ padding: '15px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <strong>{item.name}</strong> - {item.description}
            </div>
            <button onClick={async () => { await api.delete(`/menu/${item.id}`); fetchMenu(); }} style={{ color: 'red' }}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminMenu;
