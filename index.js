const express = require('express');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');

const app = express();

app.use(methodOverride('X-HTTP-Method'));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(methodOverride('X-Method-Override'));
app.use(methodOverride('_method'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }))

app.use('/', require('./routes'));

module.exports = app;