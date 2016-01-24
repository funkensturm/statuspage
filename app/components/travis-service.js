import Service from '../lib/statuspage-io-service';

export default Service.extend({
  name: 'Travis CI',
  apiEndpoint: 'https://www.traviscistatus.com/',
});
