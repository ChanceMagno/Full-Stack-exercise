# Triplog Server

This example server provides basic CRUD for Triplogs for use in completing
the RideAmigos frontend developer exercise.

## Requirements

 - Node (anything current *should* work)
 - Mongo (anything current *should* work)
 - Yarn (https://yarnpkg.com/en/docs/install)
 
## Getting Started

 - from this directory, run `yarn` to ensure dependencies are installed
 - verify that values in `config.js` such as port/mongo will not conflict with any local data
 - to install an example set of data in your Mongo DB run `node ./example-data/triplogs.js`
 - to run the server on port 3000 run `node server.js`
 
## Concepts

### Triplog

Check out the defined data model in `model/Triplog.js` to see how the information is structured
Basically, for this exercise, a triplog is a single day's trips with
each 'trip' taken that day being grouped into `segments` consisting of:

 - mode - the mode of transportation taken (viable options are in `config.js`)
 - miles - the number of one-way miles for that trip
 - dateTime - the day + time of the trip 
 
Example triplogs can be found in `example-data/Triplogs.js`
 
### API 

In our main product, we utilize a REST-like JSON api with bearer token
authentication. This example server does the same.

To authenticate, you can make an HTTP GET request to `/api/token` which
will return the token value you use when making subsequent requests. 

In this exercise, we are not considering users or sessions and the token
regenerates each time you restart the server.

### Documentation

The API documentation can be found in the `doc` directory. Open `index.html`
in your web browser to see the various endpoints and some info about
making requests.
 
