var config = {};

config.MONGO = process.env.MONGO || "mongodb://localhost/exercise-test";
config.PORT = process.env.PORT || 3000;
config.TZ = process.env.TZ || "America/Indiana/Indianapolis";

/**
 * available modes for triplogging
 */
config.triplogModes = [
  {
    label: "Bike",
    value: "bike",
    verb : "biked",
    vehiclesPerTrip: 0,
    co2PerMile: 0,
    dollarsPerMile: 0,
    caloriesPerMile: 50
  },
  {
    label: "Carpool",
    value: "carpool",
    verb : "shared a carpool",
    vehiclesPerTrip: 0.5,
    co2PerMile: 184,
    dollarsPerMile: 0.283,
    caloriesPerMile: 0
  },
  {
    label: "Drive Alone",
    value: "drive",
    verb : "drove alone",
    vehiclesPerTrip: 1,
    co2PerMile: 368,
    dollarsPerMile: 0.566,
    caloriesPerMile: 0
  },
  {
    label: "Transit",
    value: "transit",
    verb : "took public transit",
    vehiclesPerTrip: 0,
    co2PerMile: 136,
    dollarsPerMile: 0.45,
    caloriesPerMile: 0
  },
  {
    label: "Vanpool",
    value: "vanpool",
    verb : "vanpooled",
    vehiclesPerTrip: 0.16,
    co2PerMile: 97,
    dollarsPerMile: 0.095,
    caloriesPerMile: 0
  },
  {
    label: "Walk",
    value: "walk",
    verb : "walked / ran",
    vehiclesPerTrip: 0,
    co2PerMile: 0,
    dollarsPerMile: 0,
    caloriesPerMile: 100
  },
  {
    label: "Telework",
    value: "telework",
    verb : "teleworked",
    vehiclesPerTrip: 0,
    co2PerMile: 0,
    dollarsPerMile: 0,
    caloriesPerMile: 0,
    noDistance:true
  }
];


module.exports = config;
