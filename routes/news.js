const express = require('express');
const axios = require('axios');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
// const { notifySubscribers } = require('./subscription'); 
const categories = ['business', 'entertainment', 'health', 'science', 'sports'];

router.get('/:category', async (req, res) => {
    const { category } = req.params;

    if (!categories.includes(category)) {
        return res.status(400).send('Invalid category');
    }

    try {
        const response = await axios.get(`https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${process.env.NEWS_API_KEY}`);
        const articles = response.data.articles;
        // notifySubscribers(category, articles);
        res.json(articles);
    } catch (error) {
        res.status(500).send('Error fetching news');
    }
});

module.exports = router;