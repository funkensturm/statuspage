import Ember from 'ember'

export default Ember.Route.extend({
  ajax: Ember.inject.service(),

  //setupControllers(controller) {
  //
  //},

  model() {
    return this.get('ajax').request('config.json').then((payload) => {
      let result = {
        headline: payload.headline,
        providers: []
      }
      //this.set('controller.headline', payload.headline)

      let providers = payload.providers.map((provider) => {

        let desiredFeatures = []
        if (provider.features) {
          desiredFeatures = provider.features.map(function(feature) {
            return feature
          })
        }

        //console.log('im going in!')
        //const factory = getOwner(this).lookup('model:provider')
        //console.log('im went in!')
        //console.log(factory)

        return this.get('store').createRecord('provider', {
          providerType: provider.id,
          desiredFeatures: desiredFeatures
        })

      })

      result.providers = providers
      return result

    }).catch(function({ response, xhr }) {
      console.log(response)
      console.log(xhr)

      return { providers: [], errorCode: 'missing-config' }

    })
  }
})
