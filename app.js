var express = require('express');
var app = express();

app.get('/', function(request, response) {
    response.send('<h1>Hello</h1> Old Spot');
});

app.get('/team', function(request, response) {
    response.send('<h1>Squad</h1> Oh, you wana meet the team!');
});

app.get('/team/:name', function(request, response) {
    var name = request.params.name;
    response.send('<h1>' + name + '</h1> Rocks this place.<br/>Twitter: @' + name);
});

app.get('/team/:name?/:skills?', function(request, response) {
    var name = request.params.name;
    var skills = request.params.skills;

    response.send('<h1>' + name + '</h1> Rocks this place.<br/>Did you know, he is a Rockstar at: ' + skills);
});

app.get('*', function(request, response) {
	response.send('<h1>Well, seem you are lost</h1><br/>Go back to <a href="/">Home</a>');
});

var server = app.listen(3030, function() {
    console.log('Evesdropping on port 3030');
});