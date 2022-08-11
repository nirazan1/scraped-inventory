import { error } from './notifications';

export const isEmptyObject = (obj) => Object.keys(obj).length === 0;

export const validateProduct = (product) => {
  const errors = {};

  if (product.url === '') {
    errors.product_type = 'You must enter a product url';
  }

  return errors;
};

export const handleAjaxError = (err) => {
  error('Something went wrong');
  console.error(err);
};
