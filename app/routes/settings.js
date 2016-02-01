import Ember from 'ember';
import getOwner from 'ember-getowner-polyfill';
import providers from 'statuspage/providers/_providers';

export default Ember.Route.extend({
  model() {
    const owner = getOwner(this),
      factoryType = 'provider';

    return providers.map(function(provider) {
      const providerFactory = `${factoryType}:${provider}`,
        config = owner.lookup(providerFactory);

      return {
        name: config.get('name'),
        providerType: provider,
        unique: config.get('unique'),
      };
    });
  }
});
