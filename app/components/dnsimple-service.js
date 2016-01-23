import Ember from 'ember';
import Service from '../lib/status-page-service';

export default Service.extend({
  name: 'DNSimple',
  apiEndpoint: 'http://dnsimplestatus.com/',
});
