# Front-end Developer Exercise

## Description

Create an Angular 1.x based project which will allow a user to:
 - Quickly "CRUD" triplogs for a 30 day timeline
 - When pre-existing triplogs exist, see suggested triplogs and log for a day with a single click

## Big-picture Instructions 
 
 1. Fork this repo
 2. Do great stuff
  - Communicate, ask questions, etc.
 3. Submit a PR with a brief writeup of what you did

## Functional Requirements
 
 - use angular 1.x
  - if using anything that would break widespread browser compatibility (i.e., IE10+, mobile browsers), that's okay, just document it
 - consume APIs from included `server` project (see `server/README.md`)
   - Disclaimer, this hasn't been fully tested and may have issues
   - feel free to modify/add/extend/etc.
 - it should have a vertical list of the last 30 days, similar to an "agenda view"
 - for each day, you should be able to see
  - the existing triplog + ability to edit (and remove)
  - if no triplog is present
   - any suggestions that exist (which could be clickable)
   - a button to trigger display of a triplog form
 - a triplog form should have:
  - the ability to log 1 or more segments with
   - time
   - mode
   - miles (where applicable)

## Guidelines

 - In rough order of priority we'll consider:
  1. Overall Approach
  2. Functionality
  3. Code style and structure
  4. Usability
  5. Design
 
## Other notes

Feel free to use one of the "kickstart" projects if you want, whatever you prefer.

These are about as comprehensive as specs get around here before going into implementation. There are almost always edge cases that need to be figured out and sometimes they require us rethinking the entire approach. So, don't be afraid of considering things outside the scope of these requirements.

We are looking to improve our code structure, so please pay some attention to how the code is structured in your project.