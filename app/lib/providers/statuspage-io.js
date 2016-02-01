import Provider from './base';
import featureError from './feature-error';

export default Provider.extend({
  extract: function(result) {
    if (!result.components) {
      return featureError;
    }

    const moods = {
      'operational': 'ok',
      'degraded_performance': 'warning',
      'partial_outage': 'warning',
      'major_outage': 'critical',
    }

    return result
      .components
      .map(function(item) {
        const mood = moods[item.status];
        return { name: item.name, mood: mood };
      });
  }
});
