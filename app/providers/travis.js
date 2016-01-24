import Provider from '../lib/providers/statuspage-io';

export default Provider.extend({
  name: 'Travis CI',
  ajaxOptions: {
    url: 'https://www.traviscistatus.com/'
  }
});