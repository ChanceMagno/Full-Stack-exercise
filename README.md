# Full Stack Developer Exercise

## Description

Create an Angular 1.x based project which will allow a user to:
 - Quickly "CRUD" triplogs for a 30 day timeline
 - When pre-existing triplogs exist, see suggested triplogs and log for a day with a single click


### What is a Triplog?

The short answer is a record of someone's commute activity. Each day commuters log their "trips" via a webform, 3rd party integration (e.g., Moves App), or our mobile app. The data model for a `Triplog` can be found in `server/model/Triplog.js`. While this version is slightly different than what we use in production, the concept is the same.

These triplogs are used for ranking commuters and organizations in competitions (e.g., Most Bike Trips in October), awarding incentives (e.g., $30 starbucks gift card for 30 days of non-drive-alone commutes), and reporting/planning for our customers who are trying to reduce traffic/emissions or the need for additional parking spaces.

## Big-picture Instructions 
 
 1. Fork this repo
 2. Do great stuff
  - Communicate, ask questions, etc.
  - Ensure both the frontend and backend portions are completed
 3. Submit a PR with a brief writeup of what you did

## Functional Requirements
 
 - use angular 1.x
  - if using anything that would break widespread browser compatibility (i.e., IE10+, mobile browsers), that's okay, just document it
 - consume APIs from included `server` project (see `server/README.md`)
   - 2 API routes (the GET /api/triplogs and the DELETE /api/triplogs/:id routes) are unfinished, start by finishing those with appropriate Mongo/Express code
   - Disclaimer: this hasn't been fully tested and may have issues
   - feel free to modify/add/extend/etc.
 - it should have a vertical list of the last 30 days, similar to an "agenda view"
 - for each day, you should be able to see
  - the existing triplog + ability to edit (save, cancel & remove)
  - if no triplog is present
   - any suggestions that exist (which could be clickable)
   - a button to trigger display of a triplog form
 - a triplog form should have:
  - the ability to log 1 or more segments with
    - time (in 1 hour increments)
    - mode (defined by /api/triplog-modes)
    - miles (where applicable) 

## Guidelines

 - In rough order of priority, we'll consider:
  1. Overall Approach
  2. Functionality
  3. Code style and structure
  4. Usability
  5. Design
 
## Other notes

Feel free to use one of the "kickstart" projects if you want. Whatever approach you prefer should be fine.

These are about as comprehensive as specs get around here before going into implementation. There are almost always edge cases that need to be figured out. Sometimes we identify issues that require us rethinking the entire approach. So, don't be afraid of considering things outside the scope of these requirements.

We are looking to improve our code structure, so please pay some attention to how the code is structured in your project.
