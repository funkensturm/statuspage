import Ember from 'ember';

export default Ember.Route.extend({
  model() {

    this.store.createRecord('provider', {
      providerType: 'aws',
      selectedFeatures: [
        12, // CloudFront
        85, // S3 Frankfurt
      ],
    });

    return this.store.findAll('provider');
  }
});
