import Provider from '../lib/providers/base';
import featureError from '../lib/providers/feature-error';

export default Provider.extend({
  name: 'Github',

  ajaxOptions: {
    'url': 'https://status.github.com/api/status.json',
    'dataType': 'jsonp',
  },

  extract: function(result) {
    const status = result.status;
    console.log(status);
    if (!status) {
      return featureError;
    }

    const moods = {
      'good': 'ok',
      'minor': 'warning',
      'major': 'critical',
    };

    let mood = moods[status];
    return [{ name: name, mood: mood }];
  }

});
