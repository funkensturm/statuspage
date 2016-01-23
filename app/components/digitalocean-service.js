import Ember from 'ember';
import Service from '../lib/service';
import ajax from 'ic-ajax';

const {
  run: {
    bind
  }
} = Ember;

export default Service.extend({
  name: 'DigitalOcean',
  apiEndpoint: 'https://status.digitalocean.com/api/v1/status.json',

  fetchStatus() {
    ajax({
      url: this.get('apiEndpoint'),
      dataType: 'json',
    })
      .then(bind(this, 'endFetchStatus'));

  },

  endFetchStatus(result) {
    this.set('status', result.status.Production);
  }
});
