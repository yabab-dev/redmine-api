const ressourcesSingular = {
  'time_entries': 'time_entry',
  'news': 'news',
};

export default class AbstractRessource {

  constructor(api, ressource) {
    this.api = api;
    this.ressource = ressource;
    this.lastRaw = null;
  }

  query(config = {}) {
    return this.api.query(this.ressource, config)
      .then(response => {
        this.lastRaw = response;
        return response[this.ressource];
      });
  }

  queryAll(config = {}) {
    config.search       = config.search || {};
    config.search.limit = config.search.limit || 25;

    return this.query(this.ressource, config)
      .then(response => {
        this.lastRaw = response;
        const max = Math.ceil(response.total_count / config.search.limit);

        let requests = [];

        // Make a request for each page
        for (let index = 1; index < max; index++) {
          config.search.offset = index * config.search.limit;
          requests.push(this.query(this.ressource, config));
        }

        return requests;
      });
  }

  get(id) {
    return this.api.get(this.ressource + '/' + id)
      .then(response => {
        this.lastRaw = response;
        const singular = ressourcesSingular[this.ressource] || this.ressource.replace(/s$/, '');
        return response[singular];
      });
  }

  create(data) {
    return this.api.create(this.ressource, {
      method: 'POST',
      data: data,
    });
  }

  update(id, data) {
    return this.api.update(this.ressource + '/' + id, {
      method: 'PUT',
      data: data,
    });
  }

  delete(id) {
    return this.api.delete(this.ressource + '/' + id, {
      method: 'DELETE',
    });
  }

  getLastRawResponse() {
    return this.lastRaw;
  }

}
