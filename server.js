var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');

var app = express();

// var connectionString = 'mongodb://127.0.0.1:27017/webdev';
var connectionString = 'mongodb://localhost/cs5610WebDev';


// if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
//     connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
//         process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
//         process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
//         process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
//         process.env.OPENSHIFT_APP_NAME;
// }

// //     // connectionString = ''+ process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
// //     //     process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
// //     //     process.env.OPENSHIFT_APP_NAME+'';
// }

var mongoose = require("mongoose");
mongoose.connect(connectionString);


var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(session({ secret: process.env.SESSION_SECRET }));
// app.use(session({ secret: "sdfghjkl" }));
app.use(passport.initialize());
app.use(passport.session());

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;

// var assignment = require("./assignment/app.js");
// assignment(app);
// app.listen(port, ipaddress);

var project = require("./project/app.js");
project(app);
app.listen(port, ipaddress);

