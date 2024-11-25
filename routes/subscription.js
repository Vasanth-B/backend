const express = require('express');
const router = express.Router();
const Subscription = require('../models/Subscription');
const mailgun = require('mailgun-js');
const mg = mailgun({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN
});

// Subscribe to notifications
router.post('/subscribe', async (req, res) => {
    const { email, category } = req.body;

    const subscription = new Subscription({ email, category });
    await subscription.save();

    res.json({ message: 'Subscribed successfully' });
});


const notifySubscribers = async (category, articles) => {


    const subscriptions = await Subscription.find({ category });


    if (subscriptions.length === 0) {
        //console.log("No subscribers for this category.");
        return; // Exit if there are no subscribers
    }

    subscriptions.forEach(subscriber => {
        const message = {
            from: process.env.MAILGUN_FROM,
            to: subscriber.email,
            subject: `New articles in ${category}`,
            text: `Here are the latest articles:\n${articles.map(article => article.title).join('\n')}`
        };

        // try {
        //     mg.messages().send(message, (error, body) => {
        //         if (error) {
        //             console.error('Error sending email:', error);
        //         } else {
        //             //console.log('Email sent:', body);
        //         }
        //     });
        // }
        // catch (e) {
        // }
    });
};


module.exports = { router, notifySubscribers };
