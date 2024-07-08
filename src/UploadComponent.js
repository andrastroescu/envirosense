import React, { useState, useEffect } from 'react';
import { Button, Upload } from "antd";
import { FaRecycle } from 'react-icons/fa';
import "antd/dist/reset.css";
import { jwtDecode as jwt_decode } from 'jwt-decode';


const UploadComponent = ({ onPrediction, onClassCharacteristics }) => {
    const [file, setFile] = useState(null);
    const [prediction, setPrediction] = useState(null);
    const [classCharacteristics, setClassCharacteristics] = useState([]);
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
        const selectedFile = event.file;
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

            const uploadResponse = await fetch('http://localhost:5000/classify_image', {
                method: 'POST',
                body: formData
            });

            const predictData = await uploadResponse.json();

            if (predictData.prediction && predictData.class_characteristics) {
                setPrediction(predictData.prediction);
                setClassCharacteristics(predictData.class_characteristics);
                onPrediction(predictData.prediction);
                onClassCharacteristics(predictData.class_characteristics);
            } else {
                console.error('Invalid prediction:', predictData);
            }

        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: 'column' }}>
            <Upload.Dragger
                multiple
                listType="picture"
                accept=".png,.jpeg,.doc"
                onChange={handleFileChange}
                beforeUpload={() => false}
            >
                <p className="ant-upload-drag-icon">Drag files here</p>
                <p className="ant-upload-text">OR</p>
                <Button>Upload</Button>
            </Upload.Dragger>
            <button onClick={handleUpload} className="control-button">See product features</button>
            {prediction && (
                <div className="prediction-container">
                    <h2 style={{ color: '#146c43', textAlign: 'center' }} className="prediction-heading"> {prediction}</h2>
                    <div className="class-characteristics">
                        <p style={{ fontWeight: 'normal' }}> Product details </p>
                        <hr />
                        <ul>
                            {classCharacteristics.map((char, index) => (
                                <li key={index}>
                                    <b> {char.component} </b>: {char.material} {char.percentage}% <br />
                                    <strong>Additional information:</strong> {char.additional_info}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UploadComponent;