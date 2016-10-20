import Ember from 'ember'

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
    return this.get('ajax').request(options.url, options)
  }
})
