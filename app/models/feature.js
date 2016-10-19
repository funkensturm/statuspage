import Ember from 'ember'
import Moods from 'statuspage/lib/moods'

const {
  computed,
  isPresent
} = Ember

export default Ember.Object.extend({
  providerName: '',
  featureName: '',
  mood: '',
  comment: '',

  id: computed('featureName', function () {
    return this.get('featureName').dasherize()
  }),

  name: computed('providerName', 'featureName', function () {
    return `${this.get('providerName')} ${this.get('featureName')}`
  }),

  humanReadableMood: computed('mood', function () {
    const candidate = Moods[this.get('mood')]
    return isPresent(candidate) ? candidate : 'Unknown'
  })
})
