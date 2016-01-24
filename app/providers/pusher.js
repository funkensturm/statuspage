import Provider from '../lib/providers/statuspage-io';

export default Provider.extend({
  name: 'Pusher',
  ajaxOptions: {
    url: 'https://status.pusher.com/'
  }
});