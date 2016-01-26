import Ember from 'ember';

const {
  computed,
  computed: {
    alias
  }
} = Ember;

export default Ember.Component.extend({
  classNames: ['c-provider'],
  classNameBindings: ['loadingModifier'],

  lifecycle: alias('provider.lifecycle'),
  store: Ember.inject.service(),

  loadingModifier: computed('lifecycle', function() {
    return `c-provider--${this.get('lifecycle')}`;
  }),

  didReceiveAttrs() {
    this.get('provider').fetchData();
  },
  features: computed('lifecycle', function() {
    if (this.get('lifecycle') == 'loaded') {
      return this.get('provider.features');
    } else {
      let attributes = { name: this.get('provider.config.name'), mood: this.get('lifecycle') };
      return [this.get('store').createRecord('feature', attributes)];
    }
  })
});