import Ember from 'ember'

const {
  copy
} = Ember

export default Ember.Service.extend({
  ajax: Ember.inject.service(),
  // public api
  run (provider) {
    const config = provider.get('config')

    this._fetchUpstream(copy(config.get('ajaxOptions')))
      .then(function (result) {
        const attrs = [result]

        // Calls the extract logic provided by the provider config
        const features = config.extract.apply(null, attrs)

        provider.applyUpstream(features)
      },
      function (reason) {
        provider.failed(`${reason.name}: ${reason.message}`)
      })
  },

  // private
  _fetchUpstream (options) {
    return this.get('ajax').request(options.url, options)
  }
})
