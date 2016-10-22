import Provider from 'statuspage/lib/providers/aws-rss'

export default Provider.extend({
  name: 'Amazon CloudFront',

  ajaxOptions: {
    'url': 'https://query.yahooapis.com/v1/public/yql',
    'data': {
      'q': `SELECT * FROM rss WHERE url="http://status.aws.amazon.com/rss/cloudfront.rss"`,
      'format': 'json',
      'jsonCompat': 'new'
    },
    'dataType': 'jsonp'
  }
})
