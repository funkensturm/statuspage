import Service from '../lib/statuspage-io-service';

export default Service.extend({
  name: 'DNSimple',
  apiEndpoint: 'http://dnsimplestatus.com/',
});
