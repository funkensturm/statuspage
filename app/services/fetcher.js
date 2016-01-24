import Ember from 'ember';
import ajax from 'ic-ajax';

export default Ember.Service.extend({
  // public api
  run(provider) {
    const config = provider.get('config');

    this._fetchData(config.get('ajaxOptions'))
      .then(function(result) {
        const attrs = [result],
          userParams = provider.get('userParams');

        if (userParams) {
          attrs.push(userParams);
        }

        const features = config.extract.apply(null, attrs);

        provider.setFeatures(features);
      },
      function(reason) {
        // call error on provider
        provider.setError(reason);
      });
  },

  // private

  // options
  // - url
  // - dataType default 'html'
  _fetchData(options) {
    return ajax(options);
  }
});
