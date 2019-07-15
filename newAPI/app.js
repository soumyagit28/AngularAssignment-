const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const cors = require("cors");

const nodemailer = require("nodemailer");

const details = require("./details.json");


const servicemanRoutes = require('./api/routes/serviceman');
const servicerequestRoutes = require('./api/routes/servicerequest');
const userRoutes = require('./api/routes/user');
 const emailRoutes = require('./api/routes/email');
mongoose.connect(
    'mongodb://127.0.0.1:27017/contacts',
    {
  useNewUrlParser: true
    }
);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/serviceman', servicemanRoutes);
app.use('/servicerequests', servicerequestRoutes);
app.use('/users', userRoutes);
app.use('/emails', emailRoutes);


app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status(404);
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }

    });
});


module.exports = app;
