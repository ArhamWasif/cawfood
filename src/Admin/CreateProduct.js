import React, { useEffect, useState,useRef } from 'react';
import {  useParams } from 'react-router-dom';
import './CreateProduct.css'
export default function NewProduct() {
  const { productId } = useParams();

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [medium, setMedium] = useState('');
  const [small, setSmall] = useState('');
  const [large, setLarge] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    const loadInitialValues = async () => {
      try {
        if (productId) {
          let response = await fetch(`http://localhost:5000/api/get/product/${productId}`, {
            method: 'GET',
          });

          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }

          response = await response.json();

          // Check if response.data is defined before accessing nested properties
          if (response?.data) {
            setName(response.data.name);
            setDescription(response.data.description);
            setCategory(response.data.category);

            
            if (response.data.options?.[0]) {
              setMedium(response.data.options[0].medium);
              setSmall(response.data.options[0].small);
              setLarge(response.data.options[0].large);
            }
          } else {
            console.error('Data not found in the API response');
          }
        }
      } catch (error) {
        console.error('Error while fetching data:', error);
      }
    };

    loadInitialValues();
  }, [productId]); // Include productId in the dependency array
  // const handleFileButtonClick = () => {
  //   fileInputRef.current.click();
  // };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setImage(selectedFile);
  };

  const createProduct = async () => {
    const options = [{ small, medium, large }];
    const formData = new FormData();
    formData.append('name', name);
    formData.append('category', category);
    formData.append('description', description);

    // Only append the image to the formData if it exists (for updates)
    if (image) {
      formData.append('img', image);
    }

    formData.append('options', JSON.stringify(options));

    try {
      let response;
      if (productId) {
        // Update existing product
        response = await fetch(`http://localhost:5000/api/update/product/${productId}`, {
          method: 'PUT',
          body: formData,
        });
      } else {
        // Create new product
        response = await fetch('http://localhost:5000/api/create/pro', {
          method: 'POST',
          body: formData,
        });
      }

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        // Perform any other actions after successful create/update, e.g., navigate to the product list page.
        // Example: useNavigate().push('/products');
      } else {
        console.error('Failed to create/update product:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <div className="newProduct">
        <h3 className="newProductTitle">Product</h3>
        {/* {!productId && (
          <div>
            <label>Image</label>
            <input type="file" id="file" onChange={(e) => setImage(e.target.files[0])} />
            
          </div>
        )} */}
        {!productId && (
          <div>
            <label>Image</label>
            <input
              ref={fileInputRef}
              type="file"
              
              onChange={handleFileChange}
            />
            
            {/* {image && <p>{image.name}</p>
            
            
            } */}
            {/* {image && (
              <div>
                <p>{image.name}</p>
                <img
                  src={URL.createObjectURL(image)}
                  alt="Selected Product"
                  style={{ maxWidth: '200px', maxHeight: '200px' }}
                />
              </div>
            )} */}
          </div>
        )}
        <div>
          <label>Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Description</label>
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div>
          <label>Category</label>
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
        </div>
        <div>
          <label>Price for Small</label>
          <input type="text" value={small} onChange={(e) => setSmall(e.target.value)} />
        </div>
        <div>
          <label>Price for Medium</label>
          <input type="text" value={medium} onChange={(e) => setMedium(e.target.value)} />
        </div>
        <div>
          <label>Price for Large</label>
          <input type="text" value={large} onChange={(e) => setLarge(e.target.value)} />
        </div>

        <button className="createProductButton" onClick={createProduct}>
          {productId ? 'Update' : 'Create'}
        </button>
      </div>
    </div>
  );
}
