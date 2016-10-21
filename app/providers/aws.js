import Provider from '../lib/providers/base'
import featureError from '../lib/providers/feature-error'

// Alternatives:
// https://crossorigin.me/http://status.aws.amazon.com/data.json
// https://jsonp.afeld.me/?url=http://status.aws.amazon.com/data.json

export default Provider.extend({
  name: 'Amazon',

  ajaxOptions: {
    'url': 'https://query.yahooapis.com/v1/public/yql',
    'data': {
      'q': 'SELECT * FROM json WHERE url="http://status.aws.amazon.com/data.json"',
      'format': 'json',
      'jsonCompat': 'new'
    },
    'dataType': 'jsonp'
  },

  extract: function (result) {
    if (!result.query.results) { return featureError }
    const { archive, current } = result.query.results.json

    const moods = {
      0: 'ok',
      1: 'warning',
      2: 'warning',
      3: 'critical'
    }

    let hash = archive
      .map(function (item) {
        item.status = 0
        return item
      })
      .concat(current)
      .reduce(function (result, item) {
        // Effectively overwriting archived status with current status (if available)
        result[item.service] = item
        return result
      }, {})

    return Object.keys(hash)
      .map(function (key) { return hash[key] })
      .sortBy('service')
      .map(function (item) {
        let name = item.service_name
        let mood = moods[item.status]
        if (item.summary.trim().startsWith('[RESOLVED]')) {
          mood = 'ok'
        }

        return { name: name, mood: mood }
      })
  }

})
