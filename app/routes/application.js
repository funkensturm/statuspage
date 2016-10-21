import Ember from 'ember'

export default Ember.Route.extend({
  ajax: Ember.inject.service(),

  model () {
    return this.get('ajax').request('config.json').then((payload) => {
      // This data structure is the "model" which the template consumes.
      let result = {
        headline: payload.headline,
        providers: []
      }

      let providers = payload.providers.map((provider) => {
        let desiredFeatures = []
        if (provider.features) {
          desiredFeatures = provider.features.map(function (feature) {
            return feature
          })
        }

        return this.get('store').createRecord('provider', {
          providerType: provider.id,
          desiredFeatures: desiredFeatures
        })
      })

      result.providers = providers
      return result
    }).catch(function ({ response, xhr }) {
      console.error(response)
      console.error(xhr)

      return { providers: [], errorCode: 'missing-config' }
    })
  }
})
