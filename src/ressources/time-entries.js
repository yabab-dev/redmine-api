import Abstract from './abstract';

export default class TimeEntries extends Abstract {
  constructor(api) {
    super(api, 'time_entries');
  }
}
