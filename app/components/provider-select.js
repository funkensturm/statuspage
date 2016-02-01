import Ember from 'ember';

const {
  isEmpty
} = Ember;

export default Ember.Component.extend({
  store: Ember.inject.service(),

  classNames: ['c-provider-select', 'layout__item', 'u-1/3'],

  selected: false,
  showFeatureList: false,

  didReceiveAttrs() {
    this.get('store')
      .queryRecord('provider', {
        filter: { providerType: this.get('config.providerType') }
      })
      .then((provider) => {
        if (!isEmpty(provider)) {
          this.set('selected', true);
        }
      });
  },

  addProvider(provider, config) {
    // check for uniqueness
    if (isEmpty(provider) || (!isEmpty(provider) && !config.unique)) {
      this.get('store')
        .createRecord('provider', {
          providerType: config.providerType
        })
        .save()
        .then((newProvider) => {
          newProvider.fetchData();
          this.set('provider', newProvider);

          // Open the feature list
          this.set('showFeatureList', true);
        });
    } else {
      provider.fetchData();
      this.set('provider', provider);
    }
  },

  removeProvider(provider) {
    // TODO how should we find the one if it's not unique???
    if (!isEmpty(provider)) {
      this.set('provider', null);

      // Close the feature list
      this.set('showFeatureList', false);

      provider.destroyRecord();
    }
  },

  actions: {
    toggleFeatures() {
      this.toggleProperty('showFeatureList');
    },

    changeProvider(config, selected) {
      this.get('store')
        .queryRecord('provider', {
          filter: { providerType: config.providerType }
        })
        .then((provider) => {
          if (selected === true) {
            this.addProvider(provider, config);
          } else {
            this.removeProvider(provider);
          }

          this.set('selected', selected);
        });
    }
  }
});
