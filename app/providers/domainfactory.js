import Provider from 'statuspage/lib/providers/base'
import featureError from 'statuspage/lib/providers/feature-error'
import Ember from 'ember'

const {
  isArray,
  isBlank
} = Ember

// If you would like to extract data from RSS feeds provided by `http://status.aws.amazon.com/`,
// you can inherit from this Provider to get you started.

export default Provider.extend({
  ajaxOptions: {
    'url': 'https://query.yahooapis.com/v1/public/yql',
    'data': {
      'q': `SELECT * FROM rss WHERE url="https://status.df.eu/rdf.xml"`,
      'format': 'json',
      'jsonCompat': 'new'
    },
    'dataType': 'jsonp'
  },

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

    // Not sure what their data looks like when critical.
    if (latestItem.title === 'Keine Einträge') {
      return [{ name: '', mood: 'ok' }]
    } else {
      return [{ name: '', mood: 'warning' }]
    }
  }
})
