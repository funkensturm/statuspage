import Provider from '../lib/providers/statuspage-io'

export default Provider.extend({
  name: 'Flowdock',
  ajaxOptions: {
    url: 'http://status.flowdock.com/index.json'
  }
})
