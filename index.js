/*
 * This custom integration uses the Yoda Speak API
 * https://market.mashape.com/ismaelc/yoda-speak/
 *
 * Notes from Yoda Speak developer:
 * This API is a test in progress, and still sitting on a dev sandbox. Things might break quite often.
 */

'use strict';

//express
const express = require('express');
const app = express();

//other dependencies
const url = require('url');
const request = require('request');

//parses incoming text as JSON
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//use whatever port is set in the environment variable, or
//use 3000 if it isn’t set
app.set('port', process.env.PORT || 3000);

//not needed, but confirms that app is working
app.get('/', (req, res) => {
  res.send('Running!');
});

//when user enters slash command, POST to Slack endpoint
app.post('/post', (req, res) => {

	request({
		method: 'GET',
		url: 'https://yoda.p.mashape.com/yoda',
		qs: {
			sentence: req.body.text //user input data from Slack
		},
		headers: {
			'X-Mashape-Key': 'BHWHnbH00kmsh2NYnEL0T9mLg0g5p1QWYIkjsn4IXtCoWJgj5F',
      		'Content-Type': 'application/json; charset=utf-8'
		}
	}, (error, response, body) => {

		if(!error && res.statusCode == 200) {

			let data = {
				response_type: 'in_channel', //make visible to everyone in channel
				text: body
			};

			res.send(data);
		}else{
			res.send(error);
		}
	});
});

//listen and log port in console
app.listen(app.get('port'), () => {
  console.log('Node app is running on port', app.get('port'));
});