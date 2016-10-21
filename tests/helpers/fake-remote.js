export default function fakeRemote (pretender, url, fixture) {
  $.ajax({
    url: `http://localhost:4200/${fixture}.json`,
    async: false,
    dataType: 'json'
  }).done((payload) => {
    pretender.get(url, (request) => {
      return [200, { 'Content-Type': 'application/json' }, JSON.stringify(payload)]
    })
  }).fail(function (request, status, error) {
    console.error('could not load')
    console.log(request)
    console.log(status)
    console.log(error)
  })
}
