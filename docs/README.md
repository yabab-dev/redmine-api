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
api.issues.get(13) // fetch issues
  .then(data => {
    // ...
  })
  .catch(error => {
    // ...
  });

api.projects // for projects
api.time_entries // for time entries
```

## API Docs
- [RedmineAPI](redmine-api.md)
- [Issues](issues.md)
- [Projects](projects.md)
- [Time entries](time_entries.md)
