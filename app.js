var config = require("./config.js");
var providers = require("./providers.js")();

var express = require("express");
var http = require('http');
var app = express();

var router = express.Router();

require("./getMethods.js")(router, config, providers);

app.use(router);

http.createServer(app).listen(config.port, function() {
    console.log("RAND-API running on port "+config.port);
});
