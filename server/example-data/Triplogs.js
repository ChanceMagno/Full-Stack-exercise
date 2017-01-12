/**
 * Example triplogs
 *
 * run with `node example-data/Triplogs.js` to reset data in the DB
 */

"use strict";
var moment = require('moment-timezone');
var TriplogModel = require('../model/Triplog');
var config = require('../config');
var mongoose = require('mongoose');


var exampleTriplogs = [
  {
    date:moment(new Date(2017,0,9)).tz(config.TZ).toDate(),
    segments:[
      {mode:"bike",miles:3,dateTime:moment(new Date(2017,0,9,8)).tz(config.TZ).toDate()},
      {mode:"bike",miles:3,dateTime:moment(new Date(2017,0,9,17)).tz(config.TZ).toDate()}
    ]
  },
  {
    date:moment(new Date(2017,0,10)).tz(config.TZ).toDate(),
    segments:[
      {mode:"bike",miles:3,dateTime:moment(new Date(2017,0,10,8)).tz(config.TZ).toDate()},
      {mode:"drive",miles:3,dateTime:moment(new Date(2017,0,10,17)).tz(config.TZ).toDate()}
    ]
  },
  {
    date:moment(new Date(2017,0,11)).tz(config.TZ).toDate(),
    segments:[
      {mode:"drive",miles:3,dateTime:moment(new Date(2017,0,11,13)).tz(config.TZ).toDate()},
      {mode:"drive",miles:3,dateTime:moment(new Date(2017,0,11,17)).tz(config.TZ).toDate()}
    ]
  }
];


module.exports = exampleTriplogs;

if(!module.parent){
  mongoose.Promise = require('bluebird');
  mongoose.connect(config.MONGO);
  TriplogModel.remove({}).then(function(){
    TriplogModel.create(exampleTriplogs).then(function(){
      console.log("Triplogs created!");
      process.exit();
    })
  })
}
