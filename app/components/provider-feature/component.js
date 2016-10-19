import Ember from 'ember'

const {
  computed,
  computed: {
    alias,
    notEmpty
  }
} = Ember

export default Ember.Component.extend({
  classNames: ['c-provider-feature'],
  classNameBindings: ['moodModifier'],

  moodModifier: computed('feature.mood', function () {
    return `c-provider-feature--${this.get('feature.mood')}`
  }),

  id: alias('feature.id'),
  name: alias('feature.name'),
  comment: alias('feature.comment'),
  humanReadableMood: alias('feature.humanReadableMood'),
  hasComment: notEmpty('comment')
})
