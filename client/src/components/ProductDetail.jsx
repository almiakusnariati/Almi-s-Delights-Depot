import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProductDetail({ match }) {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`/api/getAll/${match.params.id}`)
      .then(response => {
        setProduct(response.data);
      })
      .catch(error => {
        setError(error.message);
      });
  }, [match.params.id]);

  return (
    <div>
      {error ? (
        <p>Error: {error}</p>
      ) : product ? (
        <div>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
          <img src={product.image} alt={product.name} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ProductDetail;
