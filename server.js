// server.js
// where your node app starts

// init project
const express = require('express');
const moment = require('moment');
const port = process.env.PORT || 3000;

var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({
  optionSuccessStatus: 200
})); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", (req, res) => {
  res.json({
    greeting: 'hello API'
  });
});

app.get("/api/:date_string?", (req, res) => {
  var dateString = req.params.date_string;
  var len = dateString.length;
  var day = moment.utc(dateString, 'YYYY-MM-DD', true);
  var flag = day.isValid();
  var result = {
    'unix': null,
    'utc': null
  };
  var reg = /^\d+$/;
  if (reg.test(dateString) && len === 10) {
    result.unix = dateString * 1000;
    result.utc = moment.utc(dateString, 'X').format('LLLL');
    res.json(result);
  } else if (flag) {
      result.unix = (day.format('x'));
      result.utc = day.format('YYYY-MM-DD');
      res.json(result);
    } else {
      res.json({"error" : "Invalid Date" });
    }
});



// listen for requests :)
var listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});