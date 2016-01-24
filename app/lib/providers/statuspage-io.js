import Provider from './base';

export default Provider.extend({
  extract: function(result) {
    const moods = {
      'Operational': 'ok',
      'Degraded Performance': 'warning',
      'Minor Outage': 'warning',
      'Partial Outage': 'warning',
      'Major Outage': 'critical',
    }

    return $(result)
      .find('.component-container')
      .map(function() {
        const $container = $(this),
          name = $container.find('.name').first().text().trim(),
          status = $container.find('.component-status').first().text().trim(),
          mood = moods[status] || 'unknown';

        return { name: name, mood: mood };
      });
  }
});
