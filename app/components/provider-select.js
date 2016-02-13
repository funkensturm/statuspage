import Ember from 'ember';

const {
  computed,
  isEmpty
} = Ember;

export default Ember.Component.extend({
  store: Ember.inject.service(),

  classNames: ['c-provider-select'],

  provider: null,
  selected: null,

  addProvider(provider, providerConfig) {
    const {
      unique,
      providerType
    } = providerConfig;

    // check for uniqueness
    if (isEmpty(provider) || (!isEmpty(provider) && !unique)) {
      this.get('store')
        .createRecord('provider', {
          providerType: providerType
        })
        .save()
        .then((newProvider) => {
          newProvider.fetchData();
          this.set('provider', newProvider);
        });
    } else {
      provider.fetchData();
      this.set('provider', provider);
    }

    this.set('selected', providerConfig);
  },

  actions: {
    selectProvider(providerConfig) {
      this.get('store')
        .queryRecord('provider', {
          filter: { providerType: providerConfig.providerType }
        })
        .then((provider) => {
          this.addProvider(provider, providerConfig);
        });
    }
  }
});
