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


app.post("/addURL", urlencodedParser, (req, res) => {

  let data = JSON.parse(req.body.data);
  let folderName = req.body.folderName;

  if (!fs.existsSync(`./${folderName}`)){
        fs.mkdirSync(`./${folderName}`);
      }


  data.forEach(word => {
    let id = word[1];
    let text = word[0];
    let index = data.indexOf(word) + 1;

    rp(`https://api.soundoftext.com/sounds/${id}`, { json: true }, (err, res, body) => {
      if (err) { return console.log(err); }

      let url = body.location;

      if(!url) {
        console.log(`URL for ${text} is missing`)
      }


      rp(url, (err, res, body) => {
        if (err) { return console.log(err); }
        console.log(`Saving word: ${text} in folder: ${folderName}`);


      })
      .pipe(fs.createWriteStream(`./${folderName}/${index}-${text}.mp3`));

    });
  })

  res.send();

})
