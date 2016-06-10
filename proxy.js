var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var fs=require("fs");
var solc = require("solc")
var http = require("http")


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(errorHandler);

var solcVersions = fs.readFileSync( './list.txt').toString().split("\n")
solcVersions.pop()
solcVersions = solcVersions.map( function (e) {return  e.slice(8,-3)})

function errorHandler(err, req, res, next) {
  //res.status(500).json( { error: err });
  res.send("")
}


var port = process.env.PORT || 8080;        // set our port

var router = express.Router();


router.route("/")
  .post(function(req, res) {


  })
  .get(function(req, res) {
    
    res.json( { compilers:solcVersions })

  })


app.use('/api', router);
app.listen(port);
