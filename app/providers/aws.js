import Provider from '../lib/providers/base';

// Alternatives:
// https://crossorigin.me/http://status.aws.amazon.com/data.json
// https://jsonp.afeld.me/?url=http://status.aws.amazon.com/data.json

export default Provider.extend({
  name: 'Amazon AWS',

  ajaxOptions: {
    'url': 'https://query.yahooapis.com/v1/public/yql',
    'data': {
       'q': 'SELECT * FROM json WHERE url="http://status.aws.amazon.com/data.json"',
       'format': 'json',
       'jsonCompat': 'new',
     },
     'dataType': 'jsonp',
  },

  extract: function(result) {
    const { archive, current } = result.query.results.json;

    const ongoing = current.reduce(function(result, item) {
      result[item.service] = item
    }, {});

    return archive.map(function(item) {
      let identifier = item.service;
      let name = item.service_name;

      if (ongoing[identifier]) {
        console.log('------------------- SAVE ME! --------------------');
        console.log(ongoing[identifier]);
        console.log('-------------------------------------------------');
        alert('Amazon is down, please save the console log!');
        return { name: name, mood: 'unknown' };
      } else {
        return { name: name, mood: 'ok' };
      }
    });
  }

});
