const papaparse = require("papaparse");
const fs = require("fs");
const rp = require('request').defaults({jar: true});
const hbs = require('hbs');
const express = require('express');
const bodyParser = require('body-parser');


const port = 4000;

var app = express();

app.use(bodyParser.json()); // use bodyParser to parse request as JSON
var urlencodedParser = bodyParser.urlencoded({ extended: false }) // parse req body middleware for form submission

app.use(express.static(`public`)); // middleware that sets up static directory in a folder of your choice - for your pages which don't need to be loaded dynamically

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
