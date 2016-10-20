import Ember from 'ember'

const JsonFixture = {
  load (path) {
    return $.ajax({
      url: `http://localhost:4200/${path}.json`,
      async: false,
      dataType: "json",
    }).done(function (data) {
      return data
    }).fail(function (request, status, error) {
      console.error('could not load')
      console.log(request)
      console.log(status)
      console.log(error)
    })
  }
}

export default JsonFixture
