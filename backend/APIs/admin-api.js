const express = require('express');
const adminApp = express.Router();
const expressAsyncHandler = require('express-async-handler');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Admin = require('../models/userModel'); // Import Admin model (using UserSchema)
const Article = require('../models/articleModel'); // Import Article model

dotenv.config();

// Admin Registration Route
adminApp.post('/adminregistration', expressAsyncHandler(async (req, res) => {
    const newAdmin = req.body;

    const dbAdmin = await Admin.findOne({ username: newAdmin.username, userType: 'admin' });

    if (dbAdmin) {
        res.status(400).send({ message: "Admin already exists" });
    } else {
        const hashedPassword = await bcryptjs.hash(newAdmin.password, 7);
        newAdmin.password = hashedPassword;
        newAdmin.userType = 'admin';

        const createdAdmin = new Admin(newAdmin);
        await createdAdmin.save();

        res.status(201).send({ message: "Admin created successfully" });
    }
}));

// Admin Login Route
adminApp.post('/adminlogin', expressAsyncHandler(async (req, res) => {
    const adminCredObj = req.body;

    const dbAdmin = await Admin.findOne({ username: adminCredObj.username, userType: 'admin' });

    if (!dbAdmin) {
        res.status(401).send({ message: "Invalid Admin" });
    } else {
        const isMatch = await bcryptjs.compare(adminCredObj.password, dbAdmin.password);
        if (!isMatch) {
            res.status(401).send({ message: "Incorrect password" });
        } else {
            const token = jwt.sign({ username: dbAdmin.username, userType: 'admin' }, process.env.SK_admin, { expiresIn: '1d' });
            res.status(200).send({ message: "Admin login successful", token, user: dbAdmin });
        }
    }
}));

// View all articles (only published ones)
adminApp.get('/view-articles', expressAsyncHandler(async (req, res) => {
    const articlesList = await Article.find({ status: true });
    res.status(200).send({ message: "All articles", payload: articlesList });
}));

//display the disabled users list
adminApp.get('/view-disabled-users', expressAsyncHandler(async (req, res) => {
    const disabledUsersList = await Admin.find({ status: false });
    res.status(200).send({ message: "All disabled users", payload: disabledUsersList });
}));

module.exports = adminApp;
