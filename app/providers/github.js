import Provider from '../lib/providers/base'
import featureError from '../lib/providers/feature-error'

export default Provider.extend({
  name: 'Github',

  ajaxOptions: {
    'url': 'https://status.github.com/api/status.json',
    'dataType': 'jsonp'
  },

  extract: function (result) {
    const status = result.status
    if (!status) { return featureError }

    const moods = {
      'good': 'ok',
      'minor': 'warning',
      'major': 'critical'
    }

    const mood = moods[status]
    // Github has no features, so the name is empty.
    // I.e. this one feature is representing the provider in general.
    return [{ name: '', mood: mood }]
  }

})
