import Ember from 'ember';

export default Ember.Route.extend({
  model() {

    this.store.createRecord('provider', {
      providerType: 'aws',
      selectedFeatures: [],
    });

    return this.store.findAll('provider');
  }
});
