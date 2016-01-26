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

    this.store.createRecord('provider', {
      providerType: 'dnsimple',
      selectedFeatures: [
        4, // Name Servers
        2, // API
        3, // Sandbox API
      ],
    });


    return this.store.findAll('provider');
  }
});
