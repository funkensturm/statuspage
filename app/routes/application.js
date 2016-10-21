import Ember from 'ember'
import { isAjaxError, isNotFoundError } from 'ember-ajax/errors'
import ENV from 'statuspage/config/environment'

const {
  isArray,
  isEmpty
} = Ember

export default Ember.Route.extend({
  ajax: Ember.inject.service(),

  model () {
    return this.get('ajax').request(ENV.configFilePath).then((payload) => {
      if (!isArray(payload.providers)) {
        return {
          headline: 'Almost there...',
          configProvidersArrayError: true
        }
      }

      const brokenFeatureProviders = payload.providers.filter(function (provider) {
        return provider.features && !isArray(provider.features)
      })

      if (!isEmpty(brokenFeatureProviders)) {
        return {
          headline: 'Just one more step...',
          configFeatureArrayError: true,
          failingProvider: `${JSON.stringify(brokenFeatureProviders[0])}`
        }
      }

      // This data structure is the "model" which the template consumes.
      let result = {
        headline: payload.headline,
        demo: payload.demo,
        providers: []
      }

      // Whatever `config.json` says about features,
      // we just pass it right in to our provider records.
      // They will handle it, whatever it is.
      result.providers = payload.providers.map((provider) => {
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

      return result
    }).catch(function (error) {
      if (`${error}`.startsWith('SyntaxError')) {
        return {
          headline: 'Getting there...',
          configSyntaxError: true,
          errorMessage: `${error}`
        }
      }

      if (isNotFoundError(error) || isAjaxError(error)) {
        return {
          headline: 'Not quite there yet...',
          configNotFoundError: true,
          errorMessage: `${error}`
        }
      }
    })
  }
})
