const mongoose = require('mongoose');

const User = new mongoose.Schema({
    userName: String,
    totalLines: Number,
    htmlLines: Number,
    cssLines: Number,
    jsLines: Number,
    posts: Number,
    avgTotalPoints: Number,
    avgHTMLPoints: Number,
    avgCSSPoints: Number,
    avgJSPoints: Number,
},{timestamps: true});

const userModel = mongoose.model('users', User);

module.exports = userModel;
