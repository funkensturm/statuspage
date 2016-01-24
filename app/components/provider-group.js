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

  loadingModifier: computed('lifecycle', function() {
    return `c-provider--${this.get('lifecycle')}`;
  }),

  name: alias('provider.displayName'),
  lifecycle: alias('provider.lifecycle'),

  didReceiveAttrs() {
    this.get('provider').fetchData();
  },
});