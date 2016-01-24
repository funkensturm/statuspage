import Ember from 'ember';
import Layout from '../templates/components/service';

const {
  computed
} = Ember;

export default Ember.Component.extend({
  classNames: ['c-service'],
  classNameBindings: ['loadingModifier'],
  layout: Layout,

  apiEndpoint: null,
  status: 'unknown',
  lastUpdated: null,

  loadingModifier: computed('status', function() {
    if (this.get('status') == 'loading') {
      return 'c-service--loading';
    }
  }),

  didReceiveAttrs() {
    this.startFetchStatus();
    this.fetchStatus();
  },

  startFetchStatus() {
    this.set('status', 'loading');
  },

  fetchStatus() {
    console.log('Implement!');
  },

  endFetchStatus(result) {
    this.set('status', result.status);

    if (result.last_updated) {
      this.set('lastUpdated', result.last_updated);
    }
  }
});
