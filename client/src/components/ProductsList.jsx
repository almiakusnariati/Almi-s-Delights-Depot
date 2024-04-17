import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProductsList() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/getAll');
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Products</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
        {Array.isArray(products) ? (
          products.map(product => (
            <li key={product.id}>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
              <img src={product.image_url} alt={product.name} />
            </li>
          ))
        ) : (
          <p>No products available</p>
        )}
      </ul>
    </div>
  );
}

export default ProductsList;
