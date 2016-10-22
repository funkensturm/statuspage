import Provider from 'statuspage/lib/providers/aws-rss'

export default Provider.extend({
  name: 'Amazon Simple Storage Service (Frankfurt)',

  ajaxOptions: {
    'url': 'https://query.yahooapis.com/v1/public/yql',
    'data': {
      'q': `SELECT * FROM rss WHERE url="http://status.aws.amazon.com/rss/s3-eu-central-1.rss"`,
      'format': 'json',
      'jsonCompat': 'new'
    },
    'dataType': 'jsonp'
  }
})
