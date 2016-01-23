import Ember from 'ember';
import Service from '../lib/service';
import ajax from 'ic-ajax';

const {
  run: {
    bind
  }
} = Ember;

export default Service.extend({
  name: 'GitHub',
  apiEndpoint: 'https://status.github.com/api/status.json',

  fetchStatus() {
    ajax({
      url: this.get('apiEndpoint'),
      jsonp: "callback",
      dataType: "jsonp",
    })
      .then(bind(this, 'endFetchStatus'));
  }
});
