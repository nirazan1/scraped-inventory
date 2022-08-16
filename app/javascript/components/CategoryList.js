import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink, Routes, Route } from 'react-router-dom';
import Category from './Category';
import ProductForm from './ProductForm';
import Product from './Product';

const CategoryList = ({ categories, onSave }) => {
  const renderCategories = (categoryArray) =>
    categoryArray
      .map((category) => (
        <li key={category.id}>
          <NavLink to={`/categories/${category.id}`}>
            {category.name}
          </NavLink>
        </li>
      ));

  return (
    <div>
      <section className="categoryList">
        <ProductForm onSave={onSave}/>
        <h3>Categories </h3>
        <ul>{renderCategories(categories)}</ul>
      </section>
    </div> 
  );
};

CategoryList.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      products: PropTypes.array
    })
  ).isRequired,
};

export default CategoryList;
