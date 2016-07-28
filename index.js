/*
 * This custom integration uses the Yoda Speak Web Service
 * https://market.mashape.com/ismaelc/yoda-speak/
 *
 */

'use strict';

//express
const express = require('express');
const app = express();

//other dependencies
const url = require('url');
const request = require('request');
const soap = require('soap');

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
	
	let wsdl = 'http://www.yodaspeak.co.uk/webservice/yodatalk.php?wsdl';
	let args = {name: req.body.text};
	
	soap.createClient(wsdl, function(err, client) {
	  	client.yodaTalk(args, function(err, result) {

		    if (!err && res.statusCode == 200){
	          
		    	let data = {
					response_type: 'in_channel', //make visible to everyone in channel
					text: result
				};

				res.send(data);
			}else{
				res.send(err);
			}
		});
	});
});

//listen and log port in console
app.listen(app.get('port'), () => {
  console.log('Node app is running on port', app.get('port'));
});
