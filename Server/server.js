const { response } = require('express');
var http = require('http');
var request = require('request');
var express = require('express');
var app = express();



app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get('/', function (req, res) {

    res.send('<b>Puteti sa va intoarceti in aplicatie! </b>');
    const cod = req.query.code;
    console.log(req.query);

    get_token_function(cod);
});

//Functie ce primeste ca parametru codul userului, si raspunsul este access_token
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
            console.log('\n############');
            console.log(res.body)
            get_Credential_List(res.body.access_token)
        }
    )

};

//Functie ce primeste ca parametru un auth_token pentru a putea raspunde cu un credentialID
get_Credential_List = (authorization_token) => {
    request.post
        (
            'https://msign-test.transsped.ro/csc/v0/credentials/list',
            {
                headers: {
                    Authorization: 'Bearer ' + authorization_token
                },
            },
            (error, res, body) => {
                if (error) {
                    console.error(error)
                    return
                }
                console.log('\n############');
                console.log(res.body)
            }
        )
};

//Porneste serverul pe portul 8080 !
app.listen(8080, function () {
    console.log('Server listening on port 8080.');
    console.log(' ------------- ');
});

// Change the 404 message modifing the middleware
app.use(function (req, res, next) {
    res.status(404).send("Sorry, that route doesn't exist. Have a nice day :)");
});

