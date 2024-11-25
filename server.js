const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

// Import 
const authRoutes = require('./routes/auth');
const newsRoutes = require('./routes/news');
const articleRoutes = require('./routes/articles');


app.use('/api/auth', authRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/articles', articleRoutes);

mongoose.connect('mongodb+srv://vasanthdany25:8lodgSTxq4x0JWri@cluster0.yt11f.mongodb.net/')
//     ,{
// //     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => {
//     //console.log('MongoDB connected');
// }).catch((err) => {
//     console.error('MongoDB connection error:', err);
// });
      .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    //console.log(`Server running on port ${PORT}`);
});
