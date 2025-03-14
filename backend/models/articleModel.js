const { default: mongoose } = require("mongoose");

const articleSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unqiue: true
    },
    articleId: {
        type: Number,
        default: Date.now
    },
    title:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        requiried:true,
    },

    dateOfCreation: {
        type: Date,
        default: Date.now
    },
    dateOfModification: {
        type: Date,
        default: Date.now
    },
    status: {
        type: Boolean,
        default: true
    },
    comments: {
        type: Array,
        default: []
    }
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;