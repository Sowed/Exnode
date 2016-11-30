var http = require('http');
var server = http.createServer(function(request, response){
	response.writeHead(200, {
		'Content-Type' : 'text/html',
		'X-Powered-By' : 'Sweat, Tears and Sleepless nights'
	})
	response.write('Hello <em>Good</em> People');
	response.end();
}).listen(4000);