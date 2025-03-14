
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const cors = require('cors');
app.use(cors(
    {
        origin: 'http://localhost:5173',
        credentials: true
    }
));

// Serve React build files
app.use(express.static(path.join(__dirname, '../client/dist')));
console.log(path.join(__dirname, '../client/dist'));



// Middleware to parse JSON request body
app.use(express.json());

// Import API routes
const authorApp = require('./APIs/author-api');
const adminApp = require('./APIs/admin-api');
const userApp = require('./APIs/user-api');

// Route API requests
app.use('/user-api', userApp);
app.use('/author-api', authorApp);
app.use('/admin-api', adminApp);

// Handle page refresh
app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// Express error handler
app.use((err, req, res, next) => {
    res.status(500).send({ errorMessage: 'error', payload: err.message });
});

// Assign port number
const port = process.env.PORT || 4000;
// app.listen(port, () => console.log(`Web server running on port ${port}`));

// Connect to MongoDB using Mongoose
mongoose.connect(process.env.DB_URL)
.then(() => {
    console.log("Database connected"),
    app.listen(port, () => console.log(`Web server running on port ${port}`))
})
.catch(err => console.log('Error in connection:', err.message));