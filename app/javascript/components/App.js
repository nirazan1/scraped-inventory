import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Home from './Home';
import Category from './Category';
import Product from './Product';
import ProductForm from './ProductForm';
import './App.css';

const App = () => (
  <>
    <Routes>
      <Route path="/categories/*" element={<Home />} />
    </Routes>
    <ToastContainer />
  </>
);

export default App;