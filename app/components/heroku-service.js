import Ember from 'ember';
import Service from '../lib/service';
import ajax from 'ic-ajax';

const {
  run: {
    bind
  }
} = Ember;

export default Service.extend({
  name: 'Heroku',
  apiEndpoint: 'https://status.heroku.com/api/v3/current-status',

  fetchStatus() {
    ajax({
      url: this.get('apiEndpoint'),
      dataType: 'json',
    })
      .then(bind(this, 'endFetchStatus'));

  },

  endFetchStatus(result) {
    this.set('status', result.status.Production);

    if (result.last_updated) {
      this.set('lastUpdated', result.last_updated);
    }
  }
});
