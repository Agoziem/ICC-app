// components/ProductList.js
import React, { useContext, useEffect } from 'react';
import { ProductContext } from '../context/ProductContext';

const ProductList = () => {
  const { products, fetchProducts, loading, error } = useContext(ProductContext);

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Product List</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
