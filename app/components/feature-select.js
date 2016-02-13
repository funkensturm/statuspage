import Ember from 'ember';

const {
  computed,
  computed: {
    alias
  },
  merge,
  copy
} = Ember;

export default Ember.Component.extend({
  store: Ember.inject.service(),

  options: alias('provider.availableFeatures'),
  selected: computed('options.[]', 'provider.features.[]', function() {
    return this.get('provider.features')
      .mapBy('name')
      .map(name => {
        return this.get('options').findBy('name', name);
      });
  }),

  actions: {
    selectFeature(features) {
      // add new features
      features.forEach(item => {
        let found = this.get('provider.features').findBy('name', item.name);

        if (!found) {
          let data = merge(copy(item), { provider: this.get('provider') });

          this.get('store')
            .createRecord('feature', data)
            .save();
        }
      });

      // remove old features
      this.get('provider.features')
        .forEach((feature) => {
          let found = features.findBy('name', feature.get('name'));

          if (!found) {
            feature.destroyRecord();
          }
        });
    }
  }
});
