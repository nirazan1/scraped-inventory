import React, { useCallback, useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import Pikaday from 'pikaday';
import PropTypes from 'prop-types';
import ProductNotFound from './ProductNotFound';
import { isEmptyObject, validateProduct } from '../helpers/helpers';

import 'pikaday/css/pikaday.css';

const ProductForm = ({ products, onSave }) => {
  const { id } = useParams();

  const initialProductState = useCallback(
    () => {
      const defaults = {
        url: '',
        price: '',
        title: '',
        description: '',
        size: '',
        mobile_number: '',
      };
      const currProduct = id ? products.find((e) => e.id === Number(id)) : {};
      return { ...defaults, ...currProduct }
    },
    [products, id]
  );

  const [product, setProduct] = useState(initialProductState);
  const [formErrors, setFormErrors] = useState({});

  const updateProduct = (key, value) => {
    setProduct((prevProduct) => ({ ...prevProduct, [key]: value }));
  };

  const handleInputChange = (e) => {
    const { target } = e;
    const { name } = target;
    const value = target.value;

    updateProduct(name, value);
  };

  useEffect(() => {
    setProduct(initialProductState);
  }, [products, initialProductState]);

  const renderErrors = () => {
    if (isEmptyObject(formErrors)) return null;

    return (
      <div className="errors">
        <h3>The following errors prohibited the product from being saved:</h3>
        <ul>
          {Object.values(formErrors).map((formError) => (
            <li key={formError}>{formError}</li>
          ))}
        </ul>
      </div>
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateProduct(product);

    if (!isEmptyObject(errors)) {
      setFormErrors(errors);
    } else {
      onSave(product);
    }
  };

  const cancelURL = product.id ? `/products/${product.id}` : '/products';

  if (id && !product.id) return <ProductNotFound />;

  return (
    <div>
      {renderErrors()}

      <form className="productForm" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="url">
            <strong>URL </strong>
            <input
              type="text"
              id="url"
              name="url"
              onChange={handleInputChange}
              value={product.url}
            />
          </label>
        </div>
        <div className="form-actions">
          <button type="submit">Save</button>
          <Link to={cancelURL}>Cancel</Link>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;

ProductForm.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      url: PropTypes.string.isRequired,
      price: PropTypes.number,
      title: PropTypes.string,
      description: PropTypes.string,
      size: PropTypes.string,
      mobile_number: PropTypes.bool,
    })
  ),
  onSave: PropTypes.func.isRequired,
};

ProductForm.defaultProps = {
  products: [],
};
