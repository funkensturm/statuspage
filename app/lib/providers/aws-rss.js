import Provider from './base'
import featureError from './feature-error'
import Ember from 'ember'

const {
  get,
  computed,
  isArray,
  isBlank
} = Ember

// If you would like to extract data from RSS feeds provided by `http://status.aws.amazon.com/`,
// you can inherit from this Provider to get you started.

export default Provider.extend({
  ajaxOptions: computed('rssID', function () {
    return {
      'url': 'https://query.yahooapis.com/v1/public/yql',
      'data': {
        'q': `SELECT * FROM rss WHERE url="http://status.aws.amazon.com/rss/${get(this, 'rssID')}.rss"`,
        'format': 'json',
        'jsonCompat': 'new'
      },
      'dataType': 'jsonp'
    }
  }),

  extract: function (result) {
    if (!result.query.results) { return featureError }

    // We either receive an Array of messages or a single message
    // Let's conform it into one single message (the latest one)
    let latestItem = result.query.results.item
    if (isArray(result.query.results.item)) {
      latestItem = result.query.results.item[0]
    }

    // If there is no item in the feed, the service is up and running.
    if (isBlank(latestItem)) { return [{ name: '', mood: 'ok' }] }

    // If the RSS is not structured as expected, bail out.
    if (isBlank(latestItem.title)) { return featureError }
    if (isBlank(latestItem.title.content)) { return featureError }

    const status = latestItem.title.content.split(':')[0]

    const moods = {
      'Service is operating normally': 'ok',
      'Informational message': 'warning',
      'Performance issues': 'warning',
      'Service disruption': 'critical'
    }

    const mood = moods[status]
    return [{ name: '', mood: mood }]
  }
})
