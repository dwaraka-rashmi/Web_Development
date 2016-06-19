var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');

var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(session({ secret: process.env.SESSION_SECRET }));
app.use(passport.initialize());
app.use(passport.session());

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

// app.use(function(req,res,next){
//     if (req.method === 'OPTIONS') {
//         // add needed headers
//         var headers = {};
//         headers["Access-Control-Allow-Origin"] = "*";
//         headers["Access-Control-Allow-Origin"] = "http://localhost:3000";
//         headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
//         headers["Access-Control-Allow-Headers"] = "X-Requested-With, Access-Control-Allow-Origin, X-HTTP-Method-Override, Content-Type, Authorization, Accept";
//     }
// });
// require("./test/app.js")(app);

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;

var assignment = require("./assignment/app.js");
assignment(app);
// app.listen(port, ipaddress);

// var project = require("./project/app.js");
// project(app);
app.listen(port, ipaddress);

