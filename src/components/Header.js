import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <h1>Burcfal</h1>
      <nav>
        <ul>
          <li><Link to="/">Ana Sayfa</Link></li>
          <li><Link to="/falcilar">Falcılarımız</Link></li>
          <li><Link to="/hakkimizda">Hakkımızda</Link></li>
          <li><Link to="/admin">Admin</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
