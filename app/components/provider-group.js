import Ember from 'ember';

const {
  computed,
  computed: {
    alias
  }
} = Ember;

export default Ember.Component.extend({
  store: Ember.inject.service(),

  classNames: ['c-provider-group'],
  classNameBindings: ['loadingModifier'],

  loadingModifier: computed('lifecycle', function() {
    return `c-provider-group--${this.get('lifecycle')}`;
  }),

  didReceiveAttrs() {
    this.get('provider').fetchData();
  },

  lifecycle: alias('provider.lifecycle'),
  features: computed('lifecycle', function() {
    if (this.get('lifecycle') == 'loaded') {
      return this.get('provider.features');
    } else {
      let feature = this.get('store')
        .createRecord('feature', {
          name: this.get('provider.config.name'),
          mood: this.get('lifecycle')
        });

      return [feature];
    }
  })
});