import Ember from 'ember';

export default Ember.Object.extend({
  mergedProperties: ['ajaxOptions'],

  ajaxOptions: {
    dataType: 'json'
  }
});