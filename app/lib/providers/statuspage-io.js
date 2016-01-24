import Provider from './base';

export default Provider.extend({
  extract: function(result) {
    const moods = {
      'operational': 'ok',
      'degraded_performance': 'warning',
      'partial_outage': 'warning',
      'major_outage': 'critical',
    }

    return result
      .components
      .map(function(item) {
        const mood = moods[item.status] || 'unknown';
        return { name: item.name, mood: mood };
      });
  }
});
