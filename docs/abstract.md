# `AbstractRessource`

See [Usage](#Usage)

### `query(config = {})`

### `queryAll(config = {})`

### `get(id)`

### `create(data)`

### `update(id, data)`

### `delete(id)`

### `getLastRawResponse()`

## Usage

**Use shortcuts**
```js
import { RedmineAPI } from '@chymz/redmine-api';

const api = new RedmineAPI('...');

api.issues.query()
  .then(data => {
    // ...
  })
  .catch(error => {
    // ...
  });
```

**Manually**
```js
import { RedmineAPI, Issues } from '@chymz/redmine-api';

const api = new RedmineAPI('...');
const res = new Issues(api);

issues.query()
  .then(data => {
    // ...
  })
  .catch(error => {
    // ...
  });
```
