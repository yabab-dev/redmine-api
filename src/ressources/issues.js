import Resource from './resource';

export default class Issues extends Resource {
  constructor(api) {
    super(api, 'issues');
  }
}
