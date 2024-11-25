const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    savedArticles: [{ type: Schema.Types.ObjectId, ref: 'Article' }]  // Reference to saved articles
});

const User = mongoose.model('User', userSchema);
module.exports = User;
