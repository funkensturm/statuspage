import Ember from 'ember'
import sanitize from 'statuspage/lib/sanitize'
import Feature from 'statuspage/models/feature'
import DS from 'ember-data'

const {
  computed,
  getOwner,
  inject,
  isEmpty
} = Ember

export default DS.Model.extend({

  // This service is responsible for loading upstream data.
  fetcher: inject.service(),

  // This corresponds to a filename in the `providers` directory.
  // E.g. "aws" or "heroku". You can think of it as a class name.
  providerType: '',

  // Which features are we interested in? This comes from `config.json`.
  // E.g. `{ id: 'api', comment: 'This is important.' }`
  desiredFeatures: [],

  // The actual features (instances) we show on the page.
  // Basically the intersection of `availableFeatures` and `desiredFeatures`.
  features: [],

  // Can be 'initializing', 'loaded', or 'error'.
  // It is 'loaded' once the upstream data was fetched and 'error' on errors.
  lifecycle: 'initializing',

  // If something went wrong, this is where we store the error message.
  comment: '',

  // Just a convenience setter to update the lifecycle from the outside.
  failed (message) {
    console.error(message)
    this.set('comment', message)
    this.set('lifecycle', 'error')
  },

  // Loads the upstream data from the provider's status page.
  // There is a callback wich will evoke `applyUpstream` on success.
  fetchUpstream () {
    this.get('fetcher').run(this)
  },

  // Instantiates Features by using the corresponding upstream items.
  applyUpstream (items) {
    // Which features does this provider have in its upstream data?
    // These are in the format `{ name: 'Api', mood: 'critical' }`
    // Let us convert that into temporary feature instances.
    const availableFeatures = items.toArray().map((item) => {
      return Feature.create({
        providerName: this.get('name'),
        featureName: item.name,
        mood: item.mood
      })
    })

    // We don't necessarily want to use all available features.
    // If no specific features were demanded, we're already done.
    if (isEmpty(this.get('desiredFeatures'))) {
      return this.applyFeatures(availableFeatures)
    }

    // If a feature was desired, we amend it with the custom configuration.
    const desiredFeatures = availableFeatures.filter((feature) => {
      const desiredFeature = this.get('desiredFeatures').findBy('id', feature.get('id'))
      if (desiredFeature) {
        feature.set('comment', desiredFeature.comment)
      }
      return desiredFeature
    })

    this.applyFeatures(desiredFeatures)
  },

  applyFeatures (records) {
    this.set('features', records)
    this.set('lifecycle', 'loaded')
  },

  name: computed('config.name', 'providerType', function () {
    return sanitize(this.get('config.name')) ||
           sanitize(this.get('providerType')).capitalize() ||
           'Unknown'
  }),

  config: computed('providerType', function () {
    // First we check whether there is a `providerType` at all.
    const providerType = this.get('providerType')
    if (isEmpty(providerType)) {
      return this.failed('Every Provider in your `config.json` needs to have an ID, ' +
                         'such as `{ "providers": [{ "id": "github" }] }`')
    }

    // Then we check whether the specified `providerType` is valid.
    const factory = `provider:${providerType}`
    const config = getOwner(this).lookup(factory)
    if (config) { return config }

    return this.failed(`The Provider ID \`${sanitize(providerType)}\` speficied in your ` +
                       '`config.json` is invalid. It must correspond to a filename ' +
                       'in the `providers` directory, e.g. "github".')
  })
})

