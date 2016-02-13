import Ember from 'ember';
import getOwner from 'ember-getowner-polyfill';
import providers from 'statuspage/providers/_providers';

export default Ember.Route.extend({
  model() {
    const owner = getOwner(this),
      factoryType = 'provider';

    return providers.map(function(providerType) {
      const providerFactory = `${factoryType}:${providerType}`,
        config = owner.lookup(providerFactory);

      return {
        providerType: providerType,
        name: config.get('name'),
        unique: config.get('unique'),
      };
    });
  }
});
