import Ember from 'ember';
import ajax from 'ic-ajax';

const {
  copy
} = Ember;

export default Ember.Service.extend({
  // public api
  run(provider) {
    const config = provider.get('config');

    this._fetchData(copy(config.get('ajaxOptions')))
      .then(function(result) {
        const attrs = [result],
          userParams = provider.get('userParams');

        if (userParams) {
          attrs.push(userParams);
        }

        // Calls the extract logic provided by the provider config
        const features = config.extract.apply(null, attrs);

        provider.setFeatures(features);
      },
      function(reason) {
        // call error on provider
        provider.setError(reason);
      });
  },

  // private
  _fetchData(options) {
    return ajax(options);
  }
});
