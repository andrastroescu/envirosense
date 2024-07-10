import React, { useRef, useState, useEffect } from 'react';
import { FaRecycle, FaDollarSign, FaRegCheck, FaInfoCircle, FaBoxOpen, FaCogs, FaLeaf, FaExclamationTriangle, FaMapMarkerAlt, FaTrashAlt } from 'react-icons/fa';
import './App.css';
import { jwtDecode as jwt_decode } from 'jwt-decode';
import UploadComponent from './UploadComponent';
import InteractiveImage from './InteractiveImage';
import ItemDetails from './ItemDetails';

const CameraComponent = () => {
    const videoRef = useRef(null);
    const [photo, setPhoto] = useState(null);
    const [prediction, setPrediction] = useState(null);
    const [classCharacteristics, setClassCharacteristics] = useState([]);
    const [userId, setUserId] = useState(null);
    const [predictedClassName, setPredictedClassName] = useState(null);
    const [predictionMade, setPredictionMade] = useState(false);
    const [stream, setStream] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < classCharacteristics.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const currentChar = classCharacteristics[currentIndex];

    const handlePrediction = (prediction) => {
        setPredictedClassName(prediction);
        setPredictionMade(true);
    };

    const handleClassCharacteristics = (characteristics) => {
        setClassCharacteristics(characteristics);
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwt_decode(token);
            const userId = decodedToken.userId;
            setUserId(userId);
        }

        return () => {
            stopCamera();
        };
    }, []);

    const startCamera = async () => {
        try {
            if (stream) {
                stopCamera();
            }
    
            const newStream = await navigator.mediaDevices.getUserMedia({ video: true });
    
            if (videoRef.current) {
                videoRef.current.srcObject = newStream;
            }
    
            setStream(newStream);
        } catch (error) {
            console.error('Error accessing camera:', error.name, error.message);
            // Handle specific errors if needed
            if (error.name === 'NotAllowedError') {
                // User denied permission
                console.log('User denied camera access.');
            } else if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
                // No camera found or available
                console.log('No camera found or available.');
            } else if (error.name === 'NotReadableError' || error.name === 'TrackStartError') {
                // Camera or video feed not readable
                console.log('Camera or video feed not readable.');
            } else if (error.name === 'OverconstrainedError' || error.name === 'ConstraintNotSatisfiedError') {
                // Constraints not satisfied by available devices
                console.log('Constraints not satisfied by available devices.');
            } else if (error.name === 'SecurityError' || error.name === 'PermissionDeniedError') {
                // Security or permission-related error
                console.log('Security or permission-related error.');
            } else {
                // Handle other errors
                console.log('Failed to access camera.');
            }
        }
    };
    

    const stopCamera = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
        }

        if (videoRef.current) {
            videoRef.current.srcObject = null;
        }
    };

    const takePhoto = () => {
        const canvas = document.createElement('canvas');
        const video = videoRef.current;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const context = canvas.getContext('2d');
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg');
        setPhoto(dataUrl);
    };

    const sendPhoto = async () => {
        try {
            const formData = new FormData();
            formData.append('image', dataURItoBlob(photo));
            formData.append('user_id', userId);
            const response = await fetch('http://localhost:5000/classify_image', {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            setPrediction(data.prediction);
            setClassCharacteristics(data.class_characteristics);
            console.log(JSON.stringify(data.class_characteristics));
        } catch (error) {
            console.error('Error sending photo:', error);
        }
    };

    const dataURItoBlob = (dataURI) => {
        const byteString = atob(dataURI.split(',')[1]);
        const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: mimeString });
    };

    return (
        <>
        <div className=''><div style={{marginTop: '50px', padding: '20px'}}>
            <h1 style={{ textAlign: 'center' }}> Not sure how to recycle? </h1>
            <h2 style={{ textAlign: 'center' }}>We're here to help </h2><br />
            <p style={{ fontWeight: 'normal' }}>Scan a product and we'll tell you all you need to know about it. </p>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <p style={{ fontWeight: 'normal' }}> Also, with each scan you will contribute to our database of recyclables. Help us make a difference!</p>
                <FaRecycle style={{ color: '#146c43', fontSize: '4rem', marginLeft: '10px' }} />
            </div>
            </div>
        </div>
            <section className=''>
                <div className="camera-container">
                    <div className="camera-controls">
                        <button onClick={startCamera} className="control-button">Start Camera</button>
                        <button onClick={takePhoto} className="control-button">Take Photo</button>
                        <button onClick={sendPhoto} className="control-button">Identify object</button>
                    </div>
                    {!stream && (
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <p>Please click "Start Camera" to begin scanning.</p>
                    <img  src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png" alt="Placeholder" className="placeholder-image" />
                </div>
                    )}
                    
                     <div className="camera-feed">
                        <video ref={videoRef} autoPlay playsInline className="video-feed"></video>
                        {photo && <img src={photo} alt="Captured" className="captured-photo" />}
                    </div>
                </div>
                {prediction && (
          <div className="main-content" style={{ marginTop: '150px' }}>
            <h2 style={{ color: '#146c43', textAlign: 'center' }} className="prediction-heading">{prediction}</h2>
            <div className="" > 
              <ItemDetails 
                item={currentChar} 
                handleNext={handleNext} 
                handlePrevious={handlePrevious}
                currentIndex={currentIndex} 
                totalItems={classCharacteristics.length} />
            </div>
            </div>
            )}
                
                <div style={{textAlign: 'center'}}> Alternatively, upload an image of a product: </div> <br/>
                <UploadComponent onPrediction={handlePrediction} onClassCharacteristics={handleClassCharacteristics} />
                {predictionMade && <InteractiveImage predictedClassName={predictedClassName} />}
         </section>
         <div style={{height: '100px'}}></div>
         </>
    );
};

export default CameraComponent;