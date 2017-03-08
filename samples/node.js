// Take functions from node-fetch and set globaly
global.fetch = require('node-fetch');
global.Headers = require('node-fetch/lib/headers');

// Load lib
const { RedmineAPI } = require('../dist/redmine-api');

// Init Redmine API client
let api = new RedmineAPI('https://www.redmine.org');

// Do requests !
api.issues.query()
  .then(data => {
    console.log(data);
  });
