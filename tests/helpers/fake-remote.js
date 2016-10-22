export default function fakeRemote (pretender, url, fixture) {
  $.ajax({ // eslint-disable-line no-undef
    url: `/${fixture}.json`,
    async: false,
    dataType: 'json'
  }).done((payload) => {
    console.log(`Stubbing ${url} to return ${fixture}`)
    pretender.get(url, () => {
      return [200, { 'Content-Type': 'application/json' }, JSON.stringify(payload)]
    })
  }).fail(function (request, status, error) {
    console.error('could not load')
    console.log(request)
    console.log(status)
    console.log(error)
  })
}
