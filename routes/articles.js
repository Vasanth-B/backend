const express = require('express');
const Article = require('../models/Article');
const User = require('../models/User');
const authenticateUser = require('../middleware/authenticateUser');

const router = express.Router();

// Use authenticateUser middleware for routes that require authentication
router.post('/save', authenticateUser, async (req, res) => {
    const { title, description, url, source } = req.body;
    try {
        // Check if the article already exists in the database
        let article = await Article.findOne({ url });
        if (!article) {
            article = new Article({ title, description, url, source });
            await article.save();
        }

        if (!req.user.savedArticles.includes(article._id)) {
            req.user.savedArticles.push(article._id);
            await req.user.save();
            res.status(200).send({ message: 'Article saved successfully' });
        } else {
            res.status(400).send({ message: 'Article already saved' });
        }
    } catch (error) {
        res.status(500).send({ error: 'Failed to save article' });
    }
});

router.get('/saved', authenticateUser, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('savedArticles');
        res.status(200).send({ savedArticles: user.savedArticles });
    } catch (error) {
        res.status(500).send({ error: 'Failed to fetch saved articles' });
    }
});

module.exports = router;
