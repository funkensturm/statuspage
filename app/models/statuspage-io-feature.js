import Ember from 'ember';

const {
  computed
} = Ember;

export default Ember.Object.extend({

  name: computed('container', function(){
    return this.get('container').find('.name').first().text().trim();
  }),

  status: computed('container', function(){
    return this.get('container').find('.component-status').first().text().trim();
  }),

  mood: computed('status', function(){
    return this.moods[this.get('status')] || 'unknown';
  }),

  moods: {
    'Operational': 'ok',
    'Degraded Performance': 'warning',
    'Minor Outage': 'warning',
    'Partial Outage': 'warning',
    'Major Outage': 'critical',
  }

});
