import {
  base64encode,
  querysring
} from './utils';
import resources from './resources/index';

// Export resources classes
export var Resource = require('./resources/resource');
export var Issues = require('./resources/issues');
export var Projects = require('./resources/issues');
export var TimeEntries = require('./resources/issues');

/**
 * RedmineAPI class
 * Connect and do requests on redmine api
 */
export class RedmineAPI {

  constructor(url, config = {}) {
    if (!url) throw new Error('[RedmineAPI] `url` on constructor is not defined');

    this.url = url.replace(/\/$/g, '');

    if(!config.headers) config.headers = new Headers();

    // Shortcuts to resources classes
    for (let name in resources) {
      let resource = new resources[name](this);
      Object.defineProperty(this, name, {
        get: () => resource
      });
    }

    this.config = config;
  }

  request(resource, config = {}) {
    config = Object.assign({}, this.config, config);

    // Full url to resource
    let url = this.url + '/' + resource + '.json';

    // HTTP Method
    if (!config.method) config.method = 'GET';

    // Headers
    config.headers.append('Content-Type', 'application/json');

    // Search Params
    if (!config.search) config.search = {};

    // API key
    if (this.config.key) {
      config.search.key = this.key;
    } else if (this.config.login && this.config.password) {
      config.headers.append('Authorization', 'Basic ' + base64encode(this.config.login + ':' + this.config.password))
    }

    // URL + query string
    url = url + '?' + querysring(config.search);

    // Body
    if (config.data) {
      config.body = JSON.stringify(config.data);
    }

    // Do request
    return fetch(url, config)
      .then(response => {
        return response.text();
      })
      .then(text => {
        if (typeof text === 'string')
          return JSON.parse(text);
        return text;
      });
  }

  query(resource, config = {}) {
    return this.request(resource, config);
  }

  queryAll(resource, config = {}) {
    config.search       = config.search || {};
    config.search.limit = config.search.limit || 25;

    return this.query(resource, config)
      .then(response => {
        const max = Math.ceil(response.total_count / config.search.limit);

        let requests = [];

        // Make a request for each page
        for (let index = 1; index < max; index++) {
          config.search.offset = index * config.search.limit;
          requests.push(this.query(resource, config));
        }

        return requests;
      });
  }

  get(resource, id) {
    return this.request(resource + '/' + id);
  }

  create(resource, data) {
    return this.request(resource, {
      method: 'POST',
      data: data,
    });
  }

  update(resource, id, data) {
    return this.request(resource + '/' + id, {
      method: 'PUT',
      data: data,
    });
  }

  delete(resource, id) {
    return this.request(resource + '/' + id, {
      method: 'DELETE',
    });
  }

  switchUser(login) {
    if (login) {
      this.config.headers.append('X-Redmine-Switch-User', login);
    } else {
      this.config.headers.delete('X-Redmine-Switch-User');
    }
  }

}
