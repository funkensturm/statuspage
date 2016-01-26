import Ember from 'ember';

export default Ember.Route.extend({
  model() {

    this.store.createRecord('provider', {
      providerType: 'aws',
      selectedFeatures: [1,2,3],
    });

    return this.store.findAll('provider');
  }
});
