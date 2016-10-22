import Provider from '../lib/providers/statuspage-io'

export default Provider.extend({
  name: 'Rollbar',
  ajaxOptions: {
    url: 'http://status.rollbar.com/index.json'
  }
})
