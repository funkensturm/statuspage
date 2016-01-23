import Ember from 'ember';
import Layout from '../templates/components/service';

export default Ember.Component.extend({
  classNames: ['c-status'],
  layout: Layout,

  apiEndpoint: null,
  status: 'unknown',
  lastUpdated: null,

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
