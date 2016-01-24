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

  loadingModifier: computed('lifecycle', function() {
    return `c-provider--${this.get('lifecycle')}`;
  }),

  didReceiveAttrs() {
    this.get('provider').fetchData();
  },
});