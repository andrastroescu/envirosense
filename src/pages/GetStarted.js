import React, { useState, useEffect } from 'react';
import UploadComponent from "../UploadComponent";
import CameraComponent from "../CameraComponent";
import InteractiveImage from "../InteractiveImage";


const GetStarted = () => {
    const [predictedClassName, setPredictedClassName] = useState(null);
    const [predictionMade, setPredictionMade] = useState(false);

        // Function to handle prediction
    const handlePrediction = (prediction) => {
        console.log("pred::: " + prediction);
        setPredictedClassName(prediction);
        setPredictionMade(true);
    };

    return (
        <div>
        <CameraComponent/>
        </div>
    );
}

export default GetStarted;