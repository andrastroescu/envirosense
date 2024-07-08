import React, { useState, useEffect } from 'react';
import { Stage, Layer, Image, Line } from 'react-konva';
import './InteractiveImage.css'; // Import your CSS file for styling
import wasteData from './wasteData'; // Import wasteData from the separate file

const InteractiveImage = ({ predictedClassName }) => {
    const [imageObj, setImageObj] = useState(null);
    const [showLines, setShowLines] = useState(false);
    const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
    const [imageURL, setImageURL] = useState('');

    const handleMouseEnter = () => {
        setShowLines(true);
    };

    const handleMouseLeave = () => {
        setShowLines(false);
    };

    useEffect(() => {
        console.log('Predicted Class Name:', predictedClassName);
        // Find the corresponding image URL for the given class name
        const imageData = wasteData.find(data => data.className === predictedClassName);
        if (imageData) {
            setImageURL(imageData.imageUrl);
            const image = new window.Image();
            image.src = imageData.imageUrl;
            image.onload = () => {
                setImageObj(image);
                setImageSize({ width: image.width, height: image.height });
            };
        }
    }, [predictedClassName]);

    return (
        <div className="interactive-image-container" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <Stage width={imageSize.width} height={imageSize.height}>
            <Layer>
                {imageObj && (
                    <Image
                        image={imageObj}
                        width={window.innerWidth/2}
                        height={window.innerHeight/2}
                    />
                )}
                
                {/* Add additional Konva shapes for interaction */}
            </Layer>
        </Stage>
        </div>
    );
};

export default InteractiveImage;