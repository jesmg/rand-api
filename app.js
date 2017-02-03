var config = require("./config.js");
var providers = require("./providers.js")(config);

var express = require("express");
var http = require('http');
var https = require('https');
var app = express();

var router = express.Router();

require("./getMethods.js")(router, config, providers);

app.use(router);

if (config.https === true) {
    try {
        var fs = require('fs');
        var privateKey = fs.readFileSync(config.privateKeyPath);
        var certificate = fs.readFileSync(config.certPath);
        var credentials = { key: privateKey, cert: certificate };
        https.createServer(credentials, app).listen(config.port, function () {
            console.log("RAND-API running on port " + config.port);
        })
    } catch(err) {
        console.log("Fatal error starting RAND-API with https: private key or certificate not found.")
    }
} else {
    http.createServer(app).listen(config.port, function () {
        console.log("RAND-API running on port " + config.port);
    });
}
