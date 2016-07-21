'use strict';

//express
const express = require('express');
const app = express();

//other dependencies
const url = require('url');
const request = require('request');

//parse through JSON
// const bodyParser = require('body-parser');
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

//use whatever port is set in the environment variable, or
//use 3000 if it isn’t set
app.set('port', process.env.PORT || 3000);

// app.get('/', function(req, res){
//   res.send('It worxsdfsdfsdfdfdsfks!');
// });

app.post('/post', function(req, res){

  	var parsed_url = url.format({
	    pathname: 'https://yoda.p.mashape.com/yoda',
	    query: {
      		//sentence: 'hello it\'s me. I was wondering if maybe after all these years you\'d like to meet'
    		sentence: req.body.text
    	}
  	}).replace(/%20/g, "+");;

	request({
		headers: {
			'X-Mashape-Key': 'BHWHnbH00kmsh2NYnEL0T9mLg0g5p1QWYIkjsn4IXtCoWJgj5F',
      		'Content-Type': 'text/html; charset=utf-8'
		},
		url: parsed_url
	}, function(error, response, body) {

		if(!error && res.statusCode == 200) {

			var body = {
				response_type: 'in_channel',
				text: body
			};

			res.send(body);
		}
	});

});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});