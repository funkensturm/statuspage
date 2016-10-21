import Provider from '../lib/providers/base'
import featureError from '../lib/providers/feature-error'

export default Provider.extend({
  name: 'Heroku',

  ajaxOptions: {
    'url': 'https://status.heroku.com/api/v3/current-status',
    'dataType': 'json'
  },

  extract: function (result) {
    const features = result.status
    if (!features) {
      return featureError
    }

    const moods = {
      'green': 'ok',
      'yellow': 'warning',
      'red': 'critical'
    }

    return Object.keys(features)
      .map(function (name) {
        let mood = moods[features[name]]
        return { name: name, mood: mood }
      })
  }

})
