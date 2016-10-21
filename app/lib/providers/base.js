import Ember from 'ember'

export default Ember.Object.extend({
  mergedProperties: ['ajaxOptions'],

  unique: true,

  ajaxOptions: {
    dataType: 'json'
  }
})
