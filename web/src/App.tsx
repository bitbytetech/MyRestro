import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './redux/store';
import { logout } from './redux/authSlice';
import Home from './pages/Home';
import Login from './pages/Login';
import AdminMenu from './pages/AdminMenu';
import Checkout from './pages/Checkout';
import './styles/global.css';

function App() {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const { items } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  return (
    <Router>
      <nav style={{ padding: '20px', backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/" style={{ fontSize: '24px', fontWeight: 'bold', textDecoration: 'none', color: '#e63946' }}>MyRestro</Link>
          <div>
            <Link to="/" style={{ margin: '0 10px', textDecoration: 'none', color: '#1d3557' }}>Home</Link>
            <Link to="/checkout" style={{ margin: '0 10px', textDecoration: 'none', color: '#1d3557', fontWeight: 'bold' }}>
              Cart ({items.length})
            </Link>
            {isAuthenticated ? (
              <>
                {user?.role === 'admin' && <Link to="/admin" style={{ margin: '0 10px', textDecoration: 'none', color: '#1d3557' }}>Admin</Link>}
                <button onClick={() => dispatch(logout())} style={{ background: 'none', border: 'none', color: '#e63946', fontWeight: 'bold' }}>Logout</button>
              </>
            ) : (
              <Link to="/login" style={{ margin: '0 10px', textDecoration: 'none', color: '#1d3557' }}>Login</Link>
            )}
          </div>
        </div>
      </nav>

      <div className="container" style={{ marginTop: '20px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminMenu />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
