const soap = require('soap');
const url = 'http://www.yodaspeak.co.uk/webservice/yodatalk.php?wsdl';
const args;

let yodaSpeak = (args) => {
	soap.createClient(url, function(err, client) {
	  client.yodaTalk(args, function(err, result) {
	      console.log(result);
	  });
	});
}

module.exports = yodaSpeak(args);
//yodaSpeak(args);