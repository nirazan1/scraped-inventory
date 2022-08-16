/* global window */

import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './Header';
import ProductForm from './ProductForm';
import CategoryList from './CategoryList';
import Category from './Category';
import Product from './Product';
import ProductList from './ProductList';
import { success } from '../helpers/notifications';
import { handleAjaxError } from '../helpers/helpers';

const Editor = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await window.fetch('/api/categories.json');
        if (!response.ok) throw Error(response.statusText);

        const data = await response.json();
        setCategories(data);
      } catch (error) {
        handleAjaxError(error);
      }

      setIsLoading(false);
    };

    fetchData();
  }, []);

  const addProduct = async (newProduct) => {
    try {
      const response = await window.fetch('/api/products.json', {
        method: 'POST',
        body: JSON.stringify(newProduct),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw Error(response.statusText);

      const savedProduct = await response.json();
      // const newProducts = [...products, savedProduct];
      // setProducts(newProducts);
      success('Product Added!');
      navigate('/categories');
    } catch (error) {
      handleAjaxError(error);
    }
  };

  const deleteProduct = async (productId) => {
    const sure = window.confirm('Are you sure?');

    if (sure) {
      try {
        const response = await window.fetch(`/api/products/${productId}.json`, {
          method: 'DELETE',
        });

        if (!response.ok) throw Error(response.statusText);

        success('Product Deleted!');
        navigate('/categories');
        // setProducts(products.filter(product => product.id !== productId));
      } catch (error) {
        handleAjaxError(error);
      }
    }
  };

  const updateProduct = async (updatedProduct) => {
    try {
      const response = await window.fetch(
        `/api/products/${updatedProduct.id}.json`,
        {
          method: 'PUT',
          body: JSON.stringify(updatedProduct),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) throw Error(response.statusText);

      // const newProducts = products;
      // const idx = newProducts.findIndex((product) => product.id === updatedProduct.id);
      // newProducts[idx] = updatedProduct;
      // setProducts(newProducts);

      success('Product Updated!');
      navigate('/categories');
    } catch (error) {
      handleAjaxError(error);
    }
  };

  return (
    <>
      <Header />
      {isLoading ? (
        <p className='loading'>Loading...</p>
      ) : (
        <div className="grid">
          <CategoryList categories={categories} onSave={addProduct}/>
          <Routes>
            <Route path=":id/*" element={<Category categories={categories} />} />
          </Routes>
        </div>
      )}
    </>
  );
};

export default Editor;
