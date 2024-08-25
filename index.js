const express = require('express');
const app = express();
app.use(express.json());

// POST endpoint
app.post('/api/data', (req, res) => {
    const { status, userId, collegeEmail, collegeRollNumber, inputArray } = req.body;

    // Separate numbers and alphabets
    const numbers = inputArray.filter(item => typeof item === 'number');
    const alphabets = inputArray.filter(item => typeof item === 'string' && /^[a-zA-Z]$/.test(item));

    // Find the highest lowercase alphabet
    const highestLowercase = alphabets.filter(item => item === item.toLowerCase()).sort().slice(-1);

    // Response object
    const response = {
        status: status,
        userId: userId,
        collegeEmail: collegeEmail,
        collegeRollNumber: collegeRollNumber,
        numbers: numbers,
        alphabets: alphabets,
        highestLowercase: highestLowercase
    };

    res.json(response);
});

// GET endpoint
app.get('/api/operation_code', (req, res) => {
    const operationCode = 'YOUR_OPERATION_CODE'; // Replace with your actual operation code
    res.json({ operation_code: operationCode });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

