import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header>
    <Link to='/products/'>
      <h1>Products</h1>
    </Link>
  </header>
);

export default Header;
