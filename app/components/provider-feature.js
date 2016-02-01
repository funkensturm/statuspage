import Ember from 'ember';

const {
  computed,
  computed: {
    alias
  }
} = Ember;

export default Ember.Component.extend({
  classNames: ['c-provider-feature'],
  classNameBindings: ['moodModifier'],

  moodModifier: computed('feature.mood', function(){
    return `c-provider-feature--${this.get('feature.mood')}`;
  }),

  name: alias('feature.name'),
  identifier: alias('feature.identifier'),
});
