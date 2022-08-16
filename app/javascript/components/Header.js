import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header>
    <Link to='/categories/'>
      <h1>Inventory</h1>
    </Link>
  </header>
);

export default Header;
