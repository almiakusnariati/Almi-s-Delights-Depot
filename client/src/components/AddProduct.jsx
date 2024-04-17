import React, { useState } from 'react';
import axios from 'axios';

function AddProduct() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/getAll', {
        name,
        description,
        price,
        image_url: imageURL // Pastikan nama properti sesuai dengan backend
      });
      // Reset form setelah berhasil menambahkan produk
      setName('');
      setDescription('');
      setPrice('');
      setImageURL('');
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Add Product</h2>
      {error && <p>Error: {error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <br />
        <label>
          Description:
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </label>
        <br />
        <label>
          Price:
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </label>
        <br />
        <label>
          Image :
          <input type="text" value={image} onChange={(e) => setImageURL(e.target.value)} required />
        </label>
        <br />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default AddProduct;
