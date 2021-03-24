var http=require('http')
var express = require('express');
var app = express();

// on the request to root (localhost:8080/)
app.get('/', function (req, res) {
    res.send('<b>My</b> first express http server');
});

// On localhost:8080/welcome
app.get('/welcome', function (req, res) {
    res.send('<b>Hello</b> welcome to my http server made with express');
});

// Change the 404 message modifing the middleware
app.use(function(req, res, next) {
    res.status(404).send("Sorry, that route doesn't exist. Have a nice day :)");
});

// start the server in the port 8080 !
app.listen(8080, function () {
    console.log('Example app listening on port 8080.');
});
