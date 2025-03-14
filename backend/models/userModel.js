// Import required modules
const mongoose = require('mongoose');

// Define the User Schema
const userSchema = new mongoose.Schema({
    userType: {
        type: String,
        enum: ['user', 'admin', 'author'],
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Invalid email format']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    status: {
        type: Boolean,
        default: true
    },
});

// Create the User model
const User = mongoose.model('User', userSchema);

// Export the model
module.exports = User;
