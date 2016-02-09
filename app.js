var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var fs=require("fs");
var solc = require("solc")



// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(errorHandler);

var solcVersions = fs.readFileSync( './node_modules/solc/bin/list.txt').toString().split("\n")
solcVersions.pop()
solcVersions = solcVersions.map( function (e) {return  e.slice(8,-3)})

function errorHandler(err, req, res, next) {
  res.status(500);
  res.json( { error: err });
}


var port = process.env.PORT || 8080;        // set our port

var router = express.Router();

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});



router.route("/compiler")
  .post(function(req, res) {
   //console.log(req)
   console.log(req.body)
   compiler = solc
   if (req.body.version !== undefined) {
     if (solcVersions.indexOf(req.body.version) > -1) {
        compiler  = solc.useVersion(req.body.version)
     }
      else {
         res.json({error: "Invalid Compiler version"})
     }
    
  }

  if (req.body.input !== undefined) {

    var output = compiler.compile({sources: req.body.input}, 1);
    res.json(output)

  } 
   

  res.json({ error: 'no source specified' });
    



  })
  .get(function(req, res) {
    
    res.json( { compilers:solcVersions })

  })


app.use('/api', router);
app.listen(port);