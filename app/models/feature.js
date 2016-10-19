import Ember from 'ember'
import Moods from 'statuspage/lib/moods'
import sanitize from 'statuspage/lib/sanitize'

const {
  computed,
  isPresent,
  isBlank,
} = Ember

export default Ember.Object.extend({
  providerName: '',
  featureName: '',
  mood: '',
  comment: '',

  id: computed('featureName', function () {
    return sanitize(this.get('featureName')).replace(/[^0-9a-zA-Z\-\_]/g, '').dasherize()
  }),

  name: computed('providerName', 'featureName', function () {
    return [
      sanitize(this.get('providerName')),
      sanitize(this.get('featureName'))
    ].filter(function(value){ return isPresent(value) }).join(' ')
  }),

  humanReadableMood: computed('mood', function () {
    const candidate = Moods[this.get('mood')]
    return isPresent(candidate) ? candidate : 'Unknown'
  })
})
