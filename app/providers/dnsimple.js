import Provider from 'statuspage/lib/providers/statuspage-io'

export default Provider.extend({
  name: 'DNSimple',
  ajaxOptions: {
    url: 'http://dnsimplestatus.com/index.json'
  }
})
