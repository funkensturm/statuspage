import Ember from 'ember';
import Service from '../lib/status-page-service';

export default Service.extend({
  name: 'Travis CI',
  apiEndpoint: 'https://www.traviscistatus.com/',
});
