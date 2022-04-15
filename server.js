

require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const User = require('./Models/user');

const port = process.env.PORT || 8080;
const mongoURI  = process.env.URI;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(mongoURI);

const db = mongoose.connection;

db.on('error', console.error.bind(
    console, 'Could not connect to MongoDB...'));
db.once('open', () => {
    console.log('Connection established with MongoDB');
});

app.get('/',(req,res) => {
    res.status(200).send({
        status: 200,
        msg: "Server OK."
    })
})

app.post('/create-user', (req,res) => {
    const incomingData = req.body;
    const newUser = new User(incomingData);
    User.findOne({userName: incomingData.userName}, (err, doc) =>{
        if (err){
            return res.status(500).send({
                message: "server ERROR",
                error: err
            })
        } else if (doc){
            return res.status(200).send({
                message: "User already exists!",
                document: doc
            })
        } else if (!err && !doc){
            newUser.save((doc)=> {
                    return res.status(200).send({
                        message: "User Created!"
                    })
            })
        }
    })

})

app.get('/get-total-ranked', (req,res) => {
    User.find({}).sort({avgPoints: -1}).limit(50).exec( (err,doc) => {
        if (err) {
            return res.status(500).send({
                message: "Server ERROR",
                error: err
            })
        }
            return res.status(200).send({
                message: "Users found!",
                document: doc,
            })
        })
    })

app.get('/get-HTML-ranked', (req,res) => {
User.find({}).sort({avgHTMLPoints: -1}).limit(50).exec( (err,doc) => {
    if (err) {
        return res.status(500).send({
            message: "Server ERROR",
            error: err
        })
    }
        return res.status(200).send({
            message: "Users found!",
            document: doc,
        })
    })
})

app.get('/get-JS-ranked', (req,res) => {
    User.find({}).sort({avgJSPoints: -1}).limit(50).exec( (err,doc) => {
        if (err) {
            return res.status(500).send({
                message: "Server ERROR",
                error: err
            })
        }
            return res.status(200).send({
                message: "Users found!",
                document: doc,
            })
        })
    })

app.get('/get-CSS-ranked', (req,res) => {
    User.find({}).sort({avgCSSPoints: -1}).limit(50).exec( (err,doc) => {
        if (err) {
            return res.status(500).send({
                message: "Server ERROR",
                error: err
            })
        }
            return res.status(200).send({
                message: "Users found!",
                document: doc,
            })
        })
    })
            
app.listen(port, () => {
    console.log(`Listening on port ${port} ...`);
});