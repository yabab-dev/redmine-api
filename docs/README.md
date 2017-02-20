# Redmine API documentation

## Initialize
```js
import { RedmineAPI } from '@chymz/redmine-api';

const api = new RedmineAPI('https://domain.com', { login: 'user', password: 'pass' });
// or
const api = new RedmineAPI('https://domain.com', { key: 'your_api_key' });
```

## Shortcuts
You can access to ressources shortcuts via its name :

```js
api.issues.get(13)
  .then(data => {
    // ...
  })
  .catch(error => {
    // ...
  });

api.projects // ...
api.time_entries // ...
```

## class `RedmineAPI`
Core of this library.

### `constructor(url, config)`

### `request(ressource, config = {})`

### `query(ressource, config = {})`

### `queryAll(ressource, config = {})`

### `get(ressource, id)`

### `create(ressource, data)`

### `update(ressource, id, data)`

### `delete(ressource, id)`

### `switchUser(login)`
