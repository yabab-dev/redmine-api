import {
  clone
} from '../utils';

const resourcesSingular = {
  'time_entries': 'time_entry',
  'news': 'news',
};

export default class AbstractResource {

  constructor(api, resource) {
    this.api = api;
    this.resource = resource;
    this.lastRaw = null;
  }

  query(config = {}) {
    return this.api.query(this.resource, config)
      .then(response => {
        this.lastRaw = response;
        return response[this.resource];
      });
  }

  queryAll(config = {}) {
    config.search       = config.search || {};
    config.search.limit = config.search.limit || 25;

    let countConfig = clone(config);
    countConfig.search.limit = 1;

    return this.api.query(this.resource, countConfig)
      .then(response => {
        this.lastRaw = response;
        const max = Math.ceil(response.total_count / config.search.limit);

        let requests = [];

        // Make a request for each page
        for (let index = 1; index < max; index++) {
          let requestConfig = clone(config);
          requestConfig.search.offset = index * config.search.limit;
          requests.push([this.resource, requestConfig]);
        }

        return requests;
      });
  }

  get(id) {
    return this.api.get(this.resource + '/' + id)
      .then(response => {
        this.lastRaw = response;
        const singular = resourcesSingular[this.resource] || this.resource.replace(/s$/, '');
        return response[singular];
      });
  }

  create(data) {
    return this.api.create(this.resource, {
      method: 'POST',
      data: data,
    });
  }

  update(id, data) {
    return this.api.update(this.resource + '/' + id, {
      method: 'PUT',
      data: data,
    });
  }

  delete(id) {
    return this.api.delete(this.resource + '/' + id, {
      method: 'DELETE',
    });
  }

  getLastRawResponse() {
    return this.lastRaw;
  }

}
