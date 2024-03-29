const mongoose = require('mongoose');

const User = new mongoose.Schema({
    userName: String,
    realName: String,
    suiteLines: Number,
    htmlLines: Number,
    cssLines: Number,
    jsLines: Number,
    posts: Number,
    avgSuitePoints: Number,
    avgHTMLPoints: Number,
    avgCSSPoints: Number,
    avgJSPoints: Number,
    pfpSrc: String
},{timestamps: true});

const userModel = mongoose.model('users', User);

module.exports = userModel;
