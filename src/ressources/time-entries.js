import Resource from './resource';

export default class TimeEntries extends Resource {
  constructor(api) {
    super(api, 'time_entries');
  }
}
