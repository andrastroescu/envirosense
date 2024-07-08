const wasteData = [
    {
        className: 'NEWSPAPER',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/The_Indianapolis_Star%2C_2011.jpg/1280px-The_Indianapolis_Star%2C_2011.jpg',
        lineCoordinates: [
            { startX: 450, startY: 150, endX: 900, endY: 150 },
            { startX: 450, startY: 250, endX: 900, endY: 200 } // Example coordinates for drawing lines
            // Add more coordinates as needed
        ]
    },
    {
        className: 'Plastic Bottle',
        imageUrl: 'url_for_plastic_bottle_image.jpg',
        lineCoordinates: [
            { startX: 100, startY: 200, endX: 200, endY: 250 }, // Example coordinates for drawing lines
            { startX: 300, startY: 400, endX: 400, endY: 450 },
            // Add more coordinates as needed
        ]
    },
    {
        className: 'Aluminum Can',
        imageUrl: 'url_for_aluminum_can_image.jpg',
        lineCoordinates: [
            { startX: 150, startY: 300, endX: 250, endY: 350 },
            // Add more coordinates as needed
        ]
    },
    // Add more objects for other waste classes
];

export default wasteData;
