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


app.get('/', function (req, res) {
  res.send('Working!')
})

/**
 * Returns session token used for authenticating against routes
 */
app.get('/api/token',function(req,res){
  res.send({
    token:authToken
  })
})

/**
 * Returns all triplogs from DB
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
 * Create/save a new triplog
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
 * Update an existing triplog
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
 * Remove an existing triplog by id
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
