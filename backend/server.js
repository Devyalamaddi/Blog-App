const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:5173", credentials: true }));

// Middleware
app.use(express.json());

// Serve frontend from the backend
app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

// Import API routes
const authorApp = require('./APIs/author-api');
const adminApp = require('./APIs/admin-api');
const userApp = require('./APIs/user-api');

// Route API requests
app.use('/user-api', userApp);
app.use('/author-api', authorApp);
app.use('/admin-api', adminApp);

// Error handling
app.use((err, req, res, next) => {
    res.status(500).send({ errorMessage: 'error', payload: err.message });
});

// Start server after DB connection
const port = process.env.PORT || 4000;
mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log("Database connected"),
            app.listen(port, () => console.log(`Server running on port ${port}`))
    })
    .catch(err => console.log('Error in connection:', err.message));
