import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';

const ProductList = ({ products }) => {

  const renderProducts = (productArray) =>
    productArray
      .map((product) => (
        <li key={product.id}>
          <NavLink to={`/products/${product.id}`}>
            {product.id} : {product.title}
          </NavLink>
        </li>
      ));

  return (
    <section className="productList">
      <h2>
        <Link to="/products/new">Add Product</Link>
      </h2>

      <ul>{renderProducts(products)}</ul>
    </section>
  );
};

ProductList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      url: PropTypes.string.isRequired,
      price: PropTypes.number,
      title: PropTypes.string,
      description: PropTypes.string,
      size: PropTypes.string,
      mobile_number: PropTypes.string,
    })
  ).isRequired,
};

export default ProductList;
