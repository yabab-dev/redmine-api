# Redmine API
Use Redmine API in browsers and NodeJS without depenency.

## Install
```sh
npm install @chymz/redmine-api
```

## Quick Sample
```js
import { RedmineAPI } from '@chymz/redmine-api';

const api = new RedmineAPI('https://domain.com', { login: 'user', password: 'pass' });
// or
const api = new RedmineAPI('https://domain.com', { key: 'your_api_key' });

// You can pass all ressources name
api.query('issues')
  .then(results =>  {
    // ...
  })
  .catch(err => {
    // ...
  });
```

## Docs
[See here](docs/README.md) for full documentation

## Implemented
- [x]  Issues ([docs](docs/issues.md))
- [x]  Projects ([docs](docs/projects.md))
- [x]  Time entries ([docs](docs/time_entries.md))
- [ ]  Users
- [ ]  Enumerations
- [ ]  Custom fields
- [ ]  Versions
- [ ]  Issue Relations
- [ ]  Issue Statuses
- [ ]  Issue Categories
- [ ]  Attachments
- [ ]  Trackers
- [ ]  Groups
- [ ]  Roles
- [ ]  News
- [ ]  Wiki Pages
- [ ]  Queries

## NodeJS & old browsers
You will need `fetch()` function to do requests on Redmine API. You can get a polyfill :
  - For NodeJS : https://www.npmjs.com/package/node-fetch
  - For old browsers : https://www.npmjs.com/package/whatwg-fetch

## License
See `LICENSE` file
