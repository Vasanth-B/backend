const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    url: String,
    source: {
        id: String,
        name: String,
    },
});

const Article = mongoose.model('Article', articleSchema);
module.exports = Article;
