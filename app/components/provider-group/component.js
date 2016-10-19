import Ember from 'ember'
import Feature from 'statuspage/models/feature'

const {
  computed,
  computed: {
    alias
  }
} = Ember

export default Ember.Component.extend({
  classNames: ['c-provider-group'],
  classNameBindings: ['loadingModifier'],

  loadingModifier: computed('lifecycle', function () {
    return `c-provider-group--${this.get('lifecycle')}`
  }),

  // Once this Provider was rendered onto the DOM,
  // it is time to perform an AJAX call to update it.
  didReceiveAttrs () {
    this.get('provider').fetchUpstream()
  },

  // Depending on the lifecycle, it may be we don't have any features yet.
  // In that case we render a dummy feature indicating that we're loading them.
  features: computed('lifecycle', function () {
    if (this.get('lifecycle') === 'loaded') {
      // If the provider has loaded its upstream data, it's safe to assume
      // that the provider has Feature instances. We can just delegate there.
      return this.get('provider.features')
    } else {
      // If the Provider has not been loaded yet or has errors, it has no Features.
      // So we instantiate a dummy Feature representing the state of the Provider.
      return this.dummyFeatures()
    }
  }),

  dummyFeatures () {
    const attributes = {
      providerName: this.get('provider.name'),
      // The provider's lifecycle is compatible with the feature's mood.
      mood: this.get('lifecycle'),
      comment: this.get('provider.comment')
    }
    return [Feature.create(attributes)]
  },

  lifecycle: alias('provider.lifecycle')
})
