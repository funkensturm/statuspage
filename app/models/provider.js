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
  // TODO make it an attr('array')
  selectedFeatures: [],

  // TODO can and should we make it an attr('string', {defaultValue: 'initializing'}) do we start with 'initializing' on a reload?
  // one of ['initializing', 'loaded', 'unknown']
  lifecycle: 'initializing',

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

  // Fetch logic
  fetcher: inject.service(),

  fetchData() {
    this.get('fetcher').run(this);
  },

  setFeatures(features) {
    // TODO validate array of hashes
    features
      .toArray()
      .forEach((item, index) => {
        // TODO 1 based index? Why?
        let identifier = index + 1;
        let selected = this.get('selectedFeatures');

        if (selected.contains(identifier)) {
          let feature = this.get('features').objectAt(index);

          item.mood = item.mood || 'unknown';

          // TODO sync features, does it work with saved features?

          if (!feature) {
            feature = this.store.createRecord('feature', item);
            feature.set('identifier', identifier);

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
    this.set('lifecycle', 'error');
  },

  // Decorator methods
  displayName: computed('config', 'userParams', function() {
    return this.get('userParams.name') || this.get('config.name');
  })
});

