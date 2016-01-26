import Ember from 'ember';
import getOwner from 'ember-getowner-polyfill';
import DS from 'ember-data';

const {
  computed,
  inject
} = Ember;

const {
  attr,
  hasMany
} = DS;

export default DS.Model.extend({
  providerType: attr('string'),
  features: hasMany('feature', {async: true, dependent: 'destroy'}),
  // TODO
  selectedFeatures: [],

  config: computed('providerType', function() {
    const owner = getOwner(this),
      factoryType = 'provider',
      providerType = this.get('providerType'),
      providerFactory = `${factoryType}:${providerType}`;

    if (name === '_providers') {
      throw new TypeError(`${providerFactory} is internal!`);
    }

    const config = owner.lookup(providerFactory);

    if (!config) {
      throw new TypeError(`Unknown ProviderFactory: ${providerFactory}`);
    }

    // Set missing defaults
    if (config.get('ajaxOptions.dataType') === 'jsonp') {
      config.set('ajaxOptions.jsonp', 'callback');
    }

    return config;
  }),

  // one of ['initializing', 'loaded', 'unknown']
  lifecycle: 'initializing',

  // Fetch logic
  fetcher: inject.service(),

  fetchData() {
    this.get('fetcher').run(this);
  },

  setFeatures(features) {
    // TODO validate array of hashes
    // TODO sync features
    features
      .toArray()
      .forEach((item, index) => {
        if (Ember.isEmpty(this.get('selectedFeatures')) || this.get('selectedFeatures').contains(index + 1)) {
          let feature = this.get('features').objectAt(index);
          if (!feature) {
            feature = this.store.createRecord('feature', item);
            this.get('features').pushObject(feature);
          } else {
            feature.setProperties(item);
            feature.save();
          }
        }
      });
    this.set('lifecycle', 'loaded');
  },

  setError(reason) {
    console.log('Error', reason);
    this.set('lifecycle', 'unknown');
  },

  // Decorator methods
  displayName: computed('config', 'userParams', function() {
    return this.get('userParams.name') || this.get('config.name');
  })
});

