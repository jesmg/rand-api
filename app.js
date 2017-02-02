var config = require("./config.js");
var providers = require("./providers.js");

var express = require("express");
var app = express();

var router = express.Router();

require("./getMethods.js")(router);

app.use(router, config, providers);

app.listen(config.port, function() {
    console.log("RAND-API running on port "+config.port);
}, function(err) {
    console.log("Error running RAND-API. Error log:\n"+err);
});
