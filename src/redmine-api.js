import {
  base64encode,
  querysring
} from './utils';
import ressources from './ressources/index';

/**
 * RedmineAPI class
 * Connect and do requests on redmine api
 */
export default class RedmineAPI {

  constructor(url, config = {}) {
    if (!url) throw new Error('[RedmineAPI] `url` on constructor is not defined');

    this.url = url.replace(/\/$/g, '');

    if(!config.headers) config.headers = new Headers();

    // Shortcuts to ressources classes
    for (let name in ressources) {
      let ressource = new ressources[name](this, name);
      Object.defineProperty(this, name, {
        get: () => ressource
      });
    }

    this.config = config;
  }

  request(ressource, config = {}) {
    config = Object.assign({}, this.config, config);

    // Full url to ressource
    let url = this.url + '/' + ressource + '.json';

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

  query(ressource, config = {}) {
    return this.request(ressource, config);
  }

  queryAll(ressource, config = {}) {
    config.search       = config.search || {};
    config.search.limit = config.search.limit || 25;

    return this.query(ressource, config)
      .then(response => {
        const max = Math.ceil(response.total_count / config.search.limit);

        let requests = [];

        // Make a request for each page
        for (let index = 1; index < max; index++) {
          config.search.offset = index * config.search.limit;
          requests.push(this.query(ressource, config));
        }

        return requests;
      });
  }

  get(ressource, id) {
    return this.request(ressource + '/' + id);
  }

  create(ressource, data) {
    return this.request(ressource, {
      method: 'POST',
      data: data,
    });
  }

  update(ressource, id, data) {
    return this.request(ressource + '/' + id, {
      method: 'PUT',
      data: data,
    });
  }

  delete(ressource, id) {
    return this.request(ressource + '/' + id, {
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
