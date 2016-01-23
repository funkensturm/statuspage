import Ember from 'ember';
import Service from '../lib/status-page-service';

export default Service.extend({
  name: 'Pusher',
  apiEndpoint: 'https://status.pusher.com/',
});

