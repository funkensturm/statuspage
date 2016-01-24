import Ember from 'ember';
import Service from './service';
import ajax from 'ic-ajax';

const {
  run: {
    bind
  },
  $
} = Ember;

export default Service.extend({
  fetchStatus() {
    ajax({
      url: this.get('apiEndpoint'),
      dataType: 'html',
    })
      .then(bind(this, 'processHTML'));
  },

  processHTML(result) {
    const features = $(result).find('.component-container')
      .map(function() {
        const $container = $(this),
          name = $container.find('.name').first().text().trim();
          status = $container.find('.component-status').first().text().trim();

        return {
          name: name,
          status: status
        };
      });

    this.set('features', features);
    this.set('status', 'loaded');
  }
});
