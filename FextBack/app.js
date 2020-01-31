require('dotenv').config({
    path: __dirname + '/.env'
});
const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cors());
app.use(helmet());
app.use(helmet.hidePoweredBy({
    setTo: 'Your Love And Support'
}));
app.use(compression());
app.use(require('./routes'));

module.exports = app;