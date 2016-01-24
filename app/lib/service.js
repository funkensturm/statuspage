import Ember from 'ember';
import Layout from '../templates/components/service';

const {
  computed
} = Ember;

export default Ember.Component.extend({
  classNames: ['c-provider'],
  classNameBindings: ['loadingModifier'],
  layout: Layout,

  apiEndpoint: null,
  lifecycle: 'loading',
  lastUpdated: null,

  loadingModifier: computed('lifecycle', function() {
    return `c-provider--${this.get('lifecycle')}`;
  }),

  didReceiveAttrs() {
    this.fetchData();
  },

  fetchData() {
    console.log('Implement!');
  },

  endFetchData(result) {
    this.set('lifecycle', result.status);
  }
});
