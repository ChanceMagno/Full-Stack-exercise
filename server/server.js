/**
 * Example server for Triplogs
 */

"use strict";
var config = require('./config');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
var _ = require('lodash');
var TriplogModel = require('./model/Triplog');

// connect to Mongo DB
mongoose.connect(config.MONGO);
// you can use promises if you want
mongoose.Promise = require('bluebird');

// configure body parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


// randomly create a new auth token each run
var authToken = _.sampleSize("ABCDEDFGHIJKL".split(''),5).join('');
// simulate token-based authentication
var secureMiddleware = function(req,res,next){
  if(!req.headers.authorization || req.headers.authorization !== "Bearer "+authToken){
    return res.status(401).send("Not Authorized");
  }else{
    next();
  }
}

/**
 * Verify that http server is available by visiting this
 * in a browser:
 * @example http://localhost:3000/
 */
app.get('/', function (req, res) {
  res.send('Working!')
})

/**
 * @apiDefine Authorization
 *
 * @apiHeader {String} authorization Bearer token
 * @apiHeaderExample {json} Bearer Token Example:
 *   {
 *     "Authorization": "Bearer JSQLM"
 *   }
 *
 * @apiError NotAuthorized Invalid/missing bearer token
 *
 * @apiErrorExample AuthorizationError
 *     HTTP/1.1 401 Not Found
 *     Not Authorized
 */

/**
 * @api {get} /api/token Get auth token
 * @apiName GetToken
 * @apiGroup Authentication
 *
 * @apiSuccess {String} token Bearer token
 *
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "token":"LEHAF"
 *   }
 *
 */
app.get('/api/token',function(req,res){
  res.send({
    token:authToken
  })
})

/**
 * @api {get} /api/triplog-modes Get triplog modes
 * @apiName GetTriplogModes
 * @apiGroup Triplog Modes
 *
 * @apiSuccess {Array} triplogModes Array of Triplog modes (see `config.js`)
 *
 * @apiSuccessExample Modes
 *   HTTP/1.1 200 OK
 *   [
 *     {
 *      label: "Bike",
 *      value: "bike",
 *      verb : "biked",
 *      vehiclesPerTrip: 0,
 *      co2PerMile: 0,
 *      dollarsPerMile: 0,
 *      caloriesPerMile: 50
 *     }
 *   ]
 * *
 */
app.get('/api/triplog-modes',secureMiddleware,function(req,res){
  res.send(config.triplogModes);
})

/**
 * @api {get} /api/triplogs Get all triplogs
 * @apiName GetTriplogs
 * @apiGroup Triplogs
 *
 * @apiSuccess {Array} Array of Triplog objects
 *
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "token":"LEHAF"
 *   }
 *
 * @apiUse Authorization
 */
app.get('/api/triplogs',secureMiddleware,function(req,res){
  TriplogModel.find({},function(err,triplogs){
    if(err){
      return res.status(400).send(err);
    }
    res.send(triplogs);
  })
})

/**
 * @api {post} /api/triplogs Create a triplog
 * @apiName CreateTriplog
 * @apiGroup Triplogs
 *
 * @apiSuccess {Triplog} Created triplog
 *
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "token":"LEHAF"
 *   }
 *
 * @apiError ValidationError Any problems found when validating triplog object
 *
 * @apiErrorExample ValidationError
 *   HTTP/1.1 400
 *   {
 *     "errors": {
 *       "segments.0.mode": {
 *         "message": "`biksssse` is not a valid enum value for path `mode`.",
 *         "name": "ValidatorError",
 *         "properties": {
 *           "enumValues": [
 *             "bike",
 *             "carpool",
 *             "drive",
 *             "transit",
 *             "vanpool",
 *             "walk",
 *             "telework"
 *           ],
 *           "type": "enum",
 *           "message": "`{VALUE}` is not a valid enum value for path `{PATH}`.",
 *           "path": "mode",
 *           "value": "biksssse"
 *         },
 *         "kind": "enum",
 *         "path": "segments.0.mode",
 *         "value": "biksssse"
 *       }
 *     },
 *     "message": "Validation failed",
 *     "name": "ValidationError"
 *   }

 * @apiUse Authorization
 */
app.post('/api/triplogs',secureMiddleware,function(req,res){
  var Triplog = new TriplogModel(req.body);
  Triplog.save(function(err,savedTriplog){
    if(err){
      return res.status(400).send(err);
    }
    res.send(savedTriplog);
  })
})

/**
 * @api {put} /api/triplogs/:id Update an existing Triplog
 * @apiName UpdateTriplog
 * @apiGroup Triplogs
 *
 * @apiParam {ObjectId} id Object ID Triplog
 *
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 204 OK
 *
 * @apiError ValidationError Any problems found when validating triplog object
 *
 * @apiErrorExample ValidationError
 *   HTTP/1.1 400
 *   {
 *     "errors": {
 *       "segments.0.mode": {
 *         "message": "`biksssse` is not a valid enum value for path `mode`.",
 *         "name": "ValidatorError",
 *         "properties": {
 *           "enumValues": [
 *             "bike",
 *             "carpool",
 *             "drive",
 *             "transit",
 *             "vanpool",
 *             "walk",
 *             "telework"
 *           ],
 *           "type": "enum",
 *           "message": "`{VALUE}` is not a valid enum value for path `{PATH}`.",
 *           "path": "mode",
 *           "value": "biksssse"
 *         },
 *         "kind": "enum",
 *         "path": "segments.0.mode",
 *         "value": "biksssse"
 *       }
 *     },
 *     "message": "Validation failed",
 *     "name": "ValidationError"
 *   }
 *
 * @apiUse Authorization
 */
app.put('/api/triplogs/:id',secureMiddleware,function(req,res){
  TriplogModel.findByIdAndUpdate(req.params.id,req.body,{runValidators:true},function(err,foundTriplog){
    if(err){
      return res.status(400).send(err);
    }
    res.status(204).send();
  })
})

/**
 * @api {delete} /api/triplogs/:id Delete an existing Triplog
 * @apiName DeleteTriplog
 * @apiGroup Triplogs
 *
 * @apiParam {ObjectId} id Object ID Triplog
 *
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 *
 * @apiUse Authorization
 */
app.delete('/api/triplogs/:id',secureMiddleware,function(req,res){
  TriplogModel.findByIdAndRemove(req.params.id,function(err,removedTriplog){
    if(err){
      return res.status(400).send(err);
    }
    res.send(removedTriplog);
  })
})


app.listen(config.PORT, function () {
  console.log('Example app listening on port 3000!')
  console.log("Don't forget, API routes must use bearer token:",authToken)
})
