import Ember from 'ember';
import DS from 'ember-data';

const {
  computed
} = Ember;

const {
  attr,
  belongsTo
} = DS;

export default DS.Model.extend({
  name: attr('string'),
  mood: attr('string'),
  identifier: attr('integer'),

  provider: belongsTo('provider', {async: true}),

  moods: {
    'ok': 'Operational',
    'warning': 'Warning',
    'critical': 'Major Outage',
    'unknown': 'Unknown',
    'initializing': 'Loading...',
    'error': 'Error!',
  },

  status: computed('mood', function() {
    return this.get('moods')[this.get('mood')];
  })
});
