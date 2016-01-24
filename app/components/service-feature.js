import Ember from 'ember';

const {
  computed
} = Ember;

export default Ember.Component.extend({

  classNames: ['c-feature'],

  classNameBindings: ['moodModifier'],

  moodModifier: computed('feature.mood', function(){
    return `c-feature--${this.get('feature.mood')}`;
  }),

});
