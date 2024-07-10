import React, { useState } from 'react';
import './main-style.css';
import axios from 'axios';
import { jwtDecode as jwt_decode } from 'jwt-decode';

const ImageUploader = () => {
  const [file, setFile] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [userId, setUserId] = useState(null); // State to store the userId

  useEffect(() => {
    // Get the token from local storage
    const token = localStorage.getItem('token');
    if (token) {
      // Decode the token to extract userId
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId; // Assuming userId is present in the token
      setUserId(userId);
    }
  }, []);

  const handleFileChange = (event) => {
    console.log(event);
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      console.error('No file selected');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('user_id', userId); // Include the userId
      console.log(formData);
      console.log(formData.get('image'));


      const uploadResponse = await fetch('https://orca-app-tue3f.ondigitalocean.app/classify_image', {
        method: 'POST',
        body: formData
      });
      
      const predictData = await uploadResponse.json();
      setPrediction(predictData.prediction);

    } catch (error) {
      console.error('Error uploading image:', error);
    }
}

  return (
    <div className="image-uploader-container">
    <input type="file" onChange={handleFileChange} className="file-input" />
    <button onClick={handleUpload} className="upload-button">Upload</button>
    {prediction && <div className="prediction-text">Prediction: {prediction}</div>}
  </div>
  );
};

export default ImageUploader;
