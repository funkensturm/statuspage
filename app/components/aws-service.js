import Ember from 'ember';
import Service from '../lib/service';
import ajax from 'ic-ajax';

const {
  run: {
    bind
  }
} = Ember;

export default Service.extend({
  name: 'AWS',
  apiEndpoint: 'http://status.aws.amazon.com/rss/cloudfront.rss',

  fetchStatus() {
    ajax({
      url: this.get('apiEndpoint'),
      dataType: 'html',
      // headers: {
      //   Accept: 'application/rss+xml'
      // }
    })
      .then(bind(this, 'endFetchStatus'), function(re) {
        console.log(re);
      });

  }
});
