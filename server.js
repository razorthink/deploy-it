var	express		= require('express'),
	services	= require('./services'),
    logger      = require('express-logger'),
    mongoose    = require('mongoose'),
	server		= express();

mongoose.connect('localhost', 'appdeploy');

// I'm too lazy for modularizing a logger :P
server.use(function(req, res, next){
  console.log('%s %s %s', req.method, req.url, req.connection.remoteAddress);
  next();
});

// Seems like there's a node package for logging :D
server.use(logger({path: "serverlog.txt"}));
server.use(express.static(__dirname + "/app"));
server.use(express.static(__dirname));
server.use(express.json());
server.use(express.urlencoded());
server.use(express.cookieParser());

services(server); //Handle AJAX requests

server.listen(8030);
// server.listen(8020);
console.log("Serving static pages on port: 8030");

//Globally expose server
module.exports = server;
