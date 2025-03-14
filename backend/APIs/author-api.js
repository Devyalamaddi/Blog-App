const exp = require('express');
const authorApp = exp.Router();
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const expressAsyncHandler = require('express-async-handler');
require('dotenv').config();
const verifyToken = require('../middlewares/verifyToken');
const Author = require('../models/userModel');
const Article = require('../models/articleModel');

// Author Registration
authorApp.post('/authorregistration', expressAsyncHandler(async (req, res) => {
    const newAuthor = req.body;
    const dbAuthor = await Author.findOne({ username: newAuthor.username });

    if (dbAuthor) {
        return res.status(409).send({ message: "Author already exists" });
    }

    newAuthor.password = await bcryptjs.hash(newAuthor.password, 7);
    const createdAuthor = new Author(newAuthor);
    await createdAuthor.save();
    res.status(201).send({ message: "Author created successfully" });
}));

// Author Login
authorApp.post('/authorlogin', expressAsyncHandler(async (req, res) => {
    const { username, password } = req.body;
    const dbAuthor = await Author.findOne({ username });

    if (!dbAuthor) {
        return res.status(404).send({ message: "Invalid author" });
    }

    const isPasswordCorrect = await bcryptjs.compare(password, dbAuthor.password);
    if (!isPasswordCorrect) {
        return res.status(401).send({ message: "Incorrect password" });
    }

    const token = jwt.sign({ username: dbAuthor.username }, process.env.SK_user, { expiresIn: '1d' });
    res.send({ message: "Author login successful", token, user: dbAuthor });
}));

// Add New Article
authorApp.post('/article', verifyToken, expressAsyncHandler(async (req, res) => {
    const newArticle = new Article(req.body);

    if (!newArticle.title || !newArticle.content) {
        return res.status(400).send({ message: "Title and content are required." });
    }

    try {
        await newArticle.save();
        res.status(201).send({ message: "New article created successfully" });
    } catch (error) {
        res.status(500).send({ message: "Failed to create article" });
    }
}));

// Modify Article
authorApp.put('/article', verifyToken, expressAsyncHandler(async (req, res) => {
    const { articleId, ...updateData } = req.body;
    const result = await Article.findOneAndUpdate({ _id: articleId }, updateData, { new: true });
    
    res.send({ message: result ? "Article modified" : "Article not found" });
}));

// Soft Delete Article
authorApp.put('/article/:articleId', verifyToken, expressAsyncHandler(async (req, res) => {
    const { articleId } = req.params;
    const result = await Article.findByIdAndUpdate(articleId, { status: false }, { new: true });
    res.send({ message: result ? "Article deleted" : "Article not found" });
}));

// View All Articles by Author
authorApp.get('/view-articles/:username', verifyToken, expressAsyncHandler(async (req, res) => {
    const { username } = req.params;
    const articlesList = await Article.find({ username, status: true });
    res.send({ message: "All articles", payload: articlesList });
}));

module.exports = authorApp;
