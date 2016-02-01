import Ember from 'ember';

const {
  isEmpty,
  merge,
  copy
} = Ember;

export default Ember.Component.extend({
  store: Ember.inject.service(),

  didReceiveAttrs() {
    this.get('store')
      .queryRecord('feature', {
        filter: {
          provider: this.get('provider.id'),
          name: this.get('item.name')
        }
      })
      .then((feature) => {
        if (!isEmpty(feature)) {
          this.set('selected', true);
        }
      });
  },

  actions: {
    changeFeature(item, selected) {
      const provider = this.get('provider');

      this.get('store')
        .queryRecord('feature', {
          filter: { provider: provider.get('id'), name: item.name }
        })
        .then((feature) => {
          if (selected === true) {
            if (isEmpty(feature)) {
              item = merge(copy(item), {provider: provider})

              this.get('store')
                .createRecord('feature', item)
                .save();
            }
          } else {
            feature.destroyRecord();
          }

          this.set('selected', selected);
        });
    }
  }
});
