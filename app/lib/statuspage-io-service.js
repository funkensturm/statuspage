import Ember from 'ember';
import Service from './service';
import ajax from 'ic-ajax';
import StatusPageIoFeature from '../models/statuspage-io-feature';

const {
  run: {
    bind
  },
  $
} = Ember;

export default Service.extend({
  fetchData() {
    ajax({
      url: this.get('apiEndpoint'),
      dataType: 'html',
    })
    .then(bind(this, 'processHTML'));
  },

  processHTML(result) {
    const features = $(result).find('.component-container')
      .map(function() {
        const feature = StatusPageIoFeature.create();
        feature.set('container', $(this));
        return feature;
      });

    this.set('features', features);
    this.set('lifecycle', 'success');
  }
});
