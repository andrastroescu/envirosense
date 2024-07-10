import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserImagesComponent.css';

const UserImagesComponent = ({ userId }) => {
    const [imageUrls, setImageUrls] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                console.log("calling fetchImages");
                const response = await axios.get(`https://orca-app-tue3f.ondigitalocean.app/images/${userId}`);
                const images = response.data.images;
                console.log(images);

                // Set image URLs for all images
                const urls = images.map(filename => `https://orca-app-tue3f.ondigitalocean.app/images/${userId}/${filename}`);
                setImageUrls(urls);
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        fetchImages();
    }, [userId]);

    return (
        <div className="image-container">
            {imageUrls.map((imageUrl, index) => (
                <img key={index} src={imageUrl} alt={`User Image ${index}`}  className="user-image"/>
            ))}
        </div>
    );
};

export default UserImagesComponent;
