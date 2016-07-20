'use strict';

//express
const express = require('express');
const app = express();

//other dependencies
const url = require('url');
const request = require('request');
const http = require('http');

//parse through JSON
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//use whatever port is set in the environment variable, or
//use 3000 if it isn’t set
app.set('port', process.env.PORT || 3000);

app.get('/', function(req, res){
  res.send('It worxsdfsdfsdfdfdsfks!');
});

// app.post('/post', function(req, res){
//   	var parsed_url = url.format({
//     pathname: 'https://yoda.p.mashape.com/yoda',
//     query: {
//     	q: req.body.text
//     }
// });

// request(parsed_url, function(error, res, body) {
// 	if(!error && res.statusCode == 200) {
// 		var data = JSON.parse(body);
// 		var first_url = data.response.hits[0].result.url;

// 		var body = {
// 			response_type: "in_channel",
// 			text: first_url
// 		};

// 		res.send(body);
// 	}
// });

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});