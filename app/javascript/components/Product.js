import React from 'react';
import PropTypes from 'prop-types';
import { useParams, Link } from 'react-router-dom';
import ProductNotFound from './ProductNotFound';

const Product = ({ products, onDelete }) => {
  const { id } = useParams();
  const product = products.find((e) => e.id === Number(id));

  if (!product) return <ProductNotFound />;

  return (
    <div className="productContainer">
      <h2>
        {product.title}
        <Link to={`/products/${product.id}/edit`}>Edit</Link>
        <button
          className="delete"
          type="button"
          onClick={() => onDelete(product.id)}
        >
          Delete
        </button>
      </h2>
      <ul>
        <li>
          <strong>URL:</strong> {product.url}
        </li>
        <li>
          <strong>Title:</strong> {product.title}
        </li>
        <li>
          <strong>Description:</strong> {product.description}
        </li>
        <li>
          <strong>Price:</strong> {product.price}
        </li>
        <li>
          <strong>Mobile Number:</strong> {product.mobile_number}
        </li>
        <li>
          <strong>Size:</strong> {product.size}
        </li>
        <li>
          {product.product_images && product.product_images.map(image => <img src={image} alt="product" />)}
        </li>
      </ul>
    </div>
  );
};

Product.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      url: PropTypes.string.isRequired,
      price: PropTypes.number,
      title: PropTypes.string,
      description: PropTypes.string,
      size: PropTypes.string,
      mobile_number: PropTypes.string,
      product_images: PropTypes.array,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Product;
