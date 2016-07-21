'use strict';

//express
const express = require('express');
const app = express();

//other dependencies
const url = require('url');
const request = require('request');

//parse through JSON
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//use whatever port is set in the environment variable, or
//use 3000 if it isn’t set
app.set('port', process.env.PORT || 3000);

//Check that app is working
app.get('/', function(req, res){
  res.send('Running!');
});

app.post('/post', function(req, res){
	var parsed_url = url.format({
	    pathname: 'https://yoda.p.mashape.com/yoda',
	    query: {
    		sentence: req.body.text
    		//sentence: 'I MUST HAVE CALLED A THOUSAND TIMES'
    	}
  	});

	request({
		headers: {
			'X-Mashape-Key': 'BHWHnbH00kmsh2NYnEL0T9mLg0g5p1QWYIkjsn4IXtCoWJgj5F',
      		'Content-Type': 'text/plain; charset=utf-8'
		},
		url: parsed_url
	}, function(error, response, body) {

		if(!error && res.statusCode == 200) {

			var data = {
				response_type: 'in_channel',
				text: body
			};

			res.send(data);
		}else{
			res.send(error);
		}
	});
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});