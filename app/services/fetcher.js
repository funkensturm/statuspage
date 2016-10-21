import Ember from 'ember'
import ENV from 'statuspage/config/environment'

const {
  copy
} = Ember

export default Ember.Service.extend({
  ajax: Ember.inject.service(),

  run (provider) {
    const config = provider.get('config')

    // If the provider has no configuration, there is nothing we can do.
    if (!config) {
      console.error(`Not fetching because this provider (${provider.get('name')}) has no config.`)
      return
    }

    this._fetch(copy(config.get('ajaxOptions')))
      .then(function (result) {
        const attrs = [result]

        // Calls the extract logic provided by the Provider config object
        const features = config.extract.apply(null, attrs)
        provider.applyUpstream(features)
      },
      function (reason) {
        provider.failed(`${reason.name}: ${reason.message}`)
      })
  },

  // Internal

  _fetch (options) {
    const url = options.url
    delete options.url

    // I hate changing production code only so we can test i.
    // Our Ajax mocking library cannot handle JSONP, so we force JSON in tests.
    // You have to ensure JSONP-providers work manually in the browser, too.
    if (ENV.environment === 'test' && options.dataType === 'jsonp') {
      console.warn(`Using JSON instead of JSONP for testing ${url}`)
      delete options.dataType
    }

    return this.get('ajax').request(url, options)
  }
})
