import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCurrentUser, logout } from '../data/consultantsData';

function Header() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    setCurrentUser(getCurrentUser());
  }, []);

  const handleLogout = () => {
    logout();
    setCurrentUser(null);
    navigate('/');
  };

  return (
    <header>
      <h1>Burcfal</h1>
      <nav>
        <ul>
          <li><Link to="/">Ana Sayfa</Link></li>
          <li><Link to="/falcilar">Falcılarımız</Link></li>
          <li><Link to="/hakkimizda">Hakkımızda</Link></li>

          {currentUser ? (
            <>
              {currentUser.role === 'admin' && (
                <li><Link to="/admin">Admin Panel</Link></li>
              )}
              {currentUser.role === 'consultant' && (
                <li><Link to="/falci-panel">Falcı Panelim</Link></li>
              )}
              <li>
                <button onClick={handleLogout} className="header-logout-btn">
                  Çıkış ({currentUser.name})
                </button>
              </li>
            </>
          ) : (
            <li><Link to="/login">Giriş Yap</Link></li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
