const { response } = require('express');
var http=require('http');
//var router = express.Router();
var request = require('request');
var express = require('express');
var app = express();
var cod;

app.use(express.json());



// on the request to root (localhost:8080/)
app.get('/', function (req, res) {
    
    res.send('<b>My</b> first express http server');
    cod = req.query.code;
    console.log(req.query);
    console.log('############');

    get_token_function(cod);

});

get_token_function = (cod) => {
  request.post(
    'https://msign-test.transsped.ro/csc/v0/oauth2/token',
    {
      json: {
              grant_type: "authorization_code",
              code: cod,
              client_id: "msdiverse",
              client_secret: "8KKhHnjKdYmAakc8",
              redirect_uri: "http://localhost:8080/"
      },
    },
    (error, res, body) => {
      if (error) {
        console.error(error)
        return
      }
      console.log(res.statusCode)
      console.log(res)
    }
  )
};

// start the server in the port 8080 !
app.listen(8080, function () {
    console.log('App listening on port 8080.');
    console.log(' ------------- ');
});

// On localhost:8080/welcome
app.get('/welcome', function (req, res) {
    res.send('<b>Hello</b> welcome to my http server made with express');
});

// Change the 404 message modifing the middleware
app.use(function(req, res, next) {
    res.status(404).send("Sorry, that route doesn't exist. Have a nice day :)");
});

