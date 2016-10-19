import Provider from './base'
import featureError from './feature-error'

// If you would like to extract data from `example.statuspage.io`,
// you can inherit from this Provider to get you started.

export default Provider.extend({

  extract: function(result) {
    if (!result.components) {
      return featureError
    }

    // statuspage.io has 4 moods, we have only 3
    // so let's map theirs to ours.
    const moods = {
      'operational': 'ok',
      'degraded_performance': 'warning',
      'partial_outage': 'warning',
      'major_outage': 'critical',
    }

    return result
      .components
      .map(function(item) {
        const mood = moods[item.status]
        return { name: item.name, mood: mood }
      })
  }

})
