const exp = require('express');
const authorApp = exp.Router();
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const expressAsyncHandler = require('express-async-handler');
require('dotenv').config();
const verifyToken = require('../middlewares/verifyToken');
const {ObjectId} =require('mongodb');

let authorsCollection;
let articlesCollection;
authorApp.use((req, res, next) => {
    authorsCollection = req.app.get('authorsCollection');
    articlesCollection = req.app.get('articlesCollection');
    next();
});

// Author Registration
authorApp.post('/authorregistration', expressAsyncHandler(async (req, res) => {
    const newAuthor = req.body;
    const dbAuthor = await authorsCollection.findOne({ username: newAuthor.username });

    if (dbAuthor) {
        res.status(409).send({ message: "Author already exists" });
    } else {
        newAuthor.password = await bcryptjs.hash(newAuthor.password, 7);
        await authorsCollection.insertOne(newAuthor);
        res.status(201).send({ message: "Author created successfully" });
    }
}));

// Author Login
authorApp.post('/authorlogin', expressAsyncHandler(async (req, res) => {
    const authorCredObj = req.body;
    const dbAuthor = await authorsCollection.findOne({ username: authorCredObj.username });

    if (!dbAuthor) {
        res.status(404).send({ message: "Invalid author" });
    } else {
        const isPasswordCorrect = await bcryptjs.compare(authorCredObj.password, dbAuthor.password);
        if (!isPasswordCorrect) {
            res.status(401).send({ message: "Incorrect password" });
        } else {
            const token = jwt.sign({ username: dbAuthor.username }, process.env.SK_user, { expiresIn: '1d' });
            res.send({ message: "Author login successful", token, user: dbAuthor });
        }
    }
}));

// Add New Article
authorApp.post('/article', verifyToken, expressAsyncHandler(async (req, res) => {
    const newArticle = req.body;

    if (!newArticle.title || !newArticle.content) {
        return res.send({ message: "Title and content are required." });
    }

    try {
        await articlesCollection.insertOne(newArticle);
        res.status(201).send({ message: "New article created successfully" });
    } catch (error) {
        res.status(500).send({ message: "Failed to create article" });
    }
}));

// Modify Article
authorApp.put('/article', verifyToken, expressAsyncHandler(async (req, res) => {
    const modifiedArticle = req.body;
    const result = await articlesCollection.updateOne({ articleId: modifiedArticle.articleId }, { $set: modifiedArticle });
    
    res.send({ message: result.modifiedCount ? "Article modified" : "Article not found" });
}));

// Soft Delete Article
authorApp.put('/article/:articleId', verifyToken, expressAsyncHandler(async (req, res) => {
    const articleIdFromUrl = Number(req.params.articleId);
    // Check if articleIdFromUrl is a valid ObjectId, then match by _id
    // const query = ObjectId.isValid(articleIdFromUrl) 
    //   ? { _id: new ObjectId(articleIdFromUrl) } 
    //   : { articleId: articleIdFromUrl };

    const result = await articlesCollection.updateOne({ articleId: articleIdFromUrl },{ $set: { status: false } });
    console.log("res from api",result);
    res.send({ message: result.modifiedCount ? "Article deleted" : "Article not found" });
}));

// View All Articles by Author
authorApp.get('/view-articles/:username', verifyToken, expressAsyncHandler(async (req, res) => {
    const authorName = req.params.username;
    const articlesList = await articlesCollection.find({ username: authorName, status: true }).toArray();

    res.send({ message: "All articles", payload: articlesList });
}));

module.exports = authorApp;
