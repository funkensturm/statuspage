import { moduleForModel, test } from 'ember-qunit'
import Pretender from 'pretender'
import wait from 'ember-test-helpers/wait'
import fakeRemote from 'statuspage/tests/helpers/fake-remote'

let server

moduleForModel('provider', 'Unit | Model | provider', {
  needs: [
    'service:ajax',
    'service:fetcher',
    'provider:aws',
    'provider:dnsimple',
    'provider:github',
    'provider:heroku',
    'provider:pusher',
    'provider:travis'
  ],
  beforeEach () {
    server = new Pretender(function () {
      this.get('/**', this.passthrough)
    })

    server.handledRequest = function (verb, path, request) {
      console.warn(`Pretender intercepted ${verb} ${path}`)
    }

    server.unhandledRequest = function (verb, path, request) {
      console.log(`Pretender ignored ${verb} ${path}`)
    }
  },
  afterEach () {
    server.shutdown()
  }
})

test('#lifecycle is `initializing`', function (assert) {
  const provider = this.subject()
  assert.equal(provider.get('lifecycle'), 'initializing')
})

test('#failed transitions into lifecycle state `error`', function (assert) {
  const provider = this.subject()
  assert.equal(provider.get('comment'), '')
  provider.failed('Kaboom')
  assert.equal(provider.get('lifecycle'), 'error')
  assert.equal(provider.get('comment'), 'Kaboom')
})

test('#providerType must be present', function (assert) {
  const provider = this.subject()
  provider.fetchUpstream()
  assert.equal(provider.get('lifecycle'), 'error')
  assert.ok(provider.get('comment').includes('needs to have an ID'))
  assert.equal(provider.get('name'), 'Unknown')
})

test('#providerType must be known', function (assert) {
  const provider = this.subject({ providerType: 'line\nbreaker' })
  provider.fetchUpstream()
  assert.equal(provider.get('lifecycle'), 'error')
  assert.ok(provider.get('comment').includes('invalid'))
  assert.ok(provider.get('comment').includes('linebreaker'))
  assert.ok(provider.get('comment').includes('must correspond to a filename'))
  assert.equal(provider.get('name'), 'Linebreaker')
})

test('DNSimple is ok', function (assert) {
  fakeRemote(server, 'http://dnsimplestatus.com/index.json', 'dnsimple-ok')
  const provider = this.subject({ providerType: 'dnsimple' })
  provider.fetchUpstream()

  return wait().then(function () {
    assert.equal(provider.get('name'), 'DNSimple')
    assert.equal(provider.get('features').length, 7)
    assert.equal(provider.get('features')[0].get('name'), 'DNSimple Website')
    assert.equal(provider.get('features')[0].get('mood'), 'ok')
    assert.equal(provider.get('features')[1].get('name'), 'DNSimple API')
    assert.equal(provider.get('features')[1].get('mood'), 'ok')
    assert.equal(provider.get('features')[2].get('name'), 'DNSimple Sandbox API')
    assert.equal(provider.get('features')[2].get('mood'), 'ok')
    assert.equal(provider.get('features')[3].get('name'), 'DNSimple Name Servers')
    assert.equal(provider.get('features')[3].get('mood'), 'ok')
    assert.equal(provider.get('features')[4].get('name'), 'DNSimple Redirector')
    assert.equal(provider.get('features')[4].get('mood'), 'ok')
    assert.equal(provider.get('features')[5].get('name'), 'DNSimple Support Site')
    assert.equal(provider.get('features')[5].get('mood'), 'ok')
    assert.equal(provider.get('features')[6].get('name'), 'DNSimple Zone deployment')
    assert.equal(provider.get('features')[6].get('mood'), 'ok')
  })
})

test('DNSimple has outages', function (assert) {
  fakeRemote(server, 'http://dnsimplestatus.com/index.json', 'dnsimple-critical')
  const provider = this.subject({ providerType: 'dnsimple' })
  provider.fetchUpstream()

  return wait().then(function () {
    assert.equal(provider.get('name'), 'DNSimple')
    assert.equal(provider.get('features').length, 7)
    assert.equal(provider.get('features')[0].get('name'), 'DNSimple Website')
    assert.equal(provider.get('features')[0].get('mood'), 'ok')
    assert.equal(provider.get('features')[1].get('name'), 'DNSimple API')
    assert.equal(provider.get('features')[1].get('mood'), 'warning')
    assert.equal(provider.get('features')[2].get('name'), 'DNSimple Sandbox API')
    assert.equal(provider.get('features')[2].get('mood'), 'warning')
    assert.equal(provider.get('features')[3].get('name'), 'DNSimple Name Servers')
    assert.equal(provider.get('features')[3].get('mood'), 'ok')
    assert.equal(provider.get('features')[4].get('name'), 'DNSimple Redirector')
    assert.equal(provider.get('features')[4].get('mood'), 'critical')
    assert.equal(provider.get('features')[5].get('name'), 'DNSimple Support Site')
    assert.equal(provider.get('features')[5].get('mood'), 'ok')
    assert.equal(provider.get('features')[6].get('name'), 'DNSimple Zone deployment')
    assert.equal(provider.get('features')[6].get('mood'), 'ok')
  })
})

test('Github is ok', function (assert) {
  fakeRemote(server, 'https://status.github.com/api/status.json', 'github-ok')
  const provider = this.subject({ providerType: 'github' })
  provider.fetchUpstream()

  return wait().then(function () {
    assert.equal(provider.get('name'), 'Github')
    assert.equal(provider.get('features').length, 1)
    assert.equal(provider.get('features')[0].get('name'), 'Github')
    assert.equal(provider.get('features')[0].get('mood'), 'ok')
  })
})

test('Github has minor problems', function (assert) {
  fakeRemote(server, 'https://status.github.com/api/status.json', 'github-warning')
  const provider = this.subject({ providerType: 'github' })
  provider.fetchUpstream()

  return wait().then(function () {
    assert.equal(provider.get('name'), 'Github')
    assert.equal(provider.get('features').length, 1)
    assert.equal(provider.get('features')[0].get('name'), 'Github')
    assert.equal(provider.get('features')[0].get('mood'), 'warning')
  })
})

test('Github has major problems', function (assert) {
  fakeRemote(server, 'https://status.github.com/api/status.json', 'github-critical')
  const provider = this.subject({ providerType: 'github' })
  provider.fetchUpstream()

  return wait().then(function () {
    assert.equal(provider.get('name'), 'Github')
    assert.equal(provider.get('features').length, 1)
    assert.equal(provider.get('features')[0].get('name'), 'Github')
    assert.equal(provider.get('features')[0].get('mood'), 'critical')
  })
})

test('Heroku is all green', function (assert) {
  fakeRemote(server, 'https://status.heroku.com/api/v3/current-status', 'heroku-ok')
  const provider = this.subject({ providerType: 'heroku' })
  provider.fetchUpstream()

  return wait().then(function () {
    assert.equal(provider.get('name'), 'Heroku')
    assert.equal(provider.get('features').length, 2)
    assert.equal(provider.get('features')[0].get('name'), 'Heroku Production')
    assert.equal(provider.get('features')[0].get('mood'), 'ok')
    assert.equal(provider.get('features')[1].get('name'), 'Heroku Development')
    assert.equal(provider.get('features')[1].get('mood'), 'ok')
  })
})

test('Heroku has outages', function (assert) {
  fakeRemote(server, 'https://status.heroku.com/api/v3/current-status', 'heroku-critical')
  const provider = this.subject({ providerType: 'heroku' })
  provider.fetchUpstream()

  return wait().then(function () {
    assert.equal(provider.get('name'), 'Heroku')
    assert.equal(provider.get('features').length, 2)
    assert.equal(provider.get('features')[0].get('name'), 'Heroku Production')
    assert.equal(provider.get('features')[0].get('mood'), 'warning')
    assert.equal(provider.get('features')[1].get('name'), 'Heroku Development')
    assert.equal(provider.get('features')[1].get('mood'), 'critical')
  })
})

test('Travis is ok', function (assert) {
  fakeRemote(server, 'https://www.traviscistatus.com/index.json', 'travis-ok')
  const provider = this.subject({ providerType: 'travis' })
  provider.fetchUpstream()

  return wait().then(function () {
    assert.equal(provider.get('name'), 'Travis CI')
    assert.equal(provider.get('features').length, 5)
    assert.equal(provider.get('features')[0].get('name'), 'Travis CI API')
    assert.equal(provider.get('features')[0].get('mood'), 'ok')
    assert.equal(provider.get('features')[1].get('name'), 'Travis CI Web App')
    assert.equal(provider.get('features')[1].get('mood'), 'ok')
    assert.equal(provider.get('features')[2].get('name'), 'Travis CI Builds Processing')
    assert.equal(provider.get('features')[2].get('mood'), 'ok')
    assert.equal(provider.get('features')[3].get('name'), 'Travis CI Background Processing')
    assert.equal(provider.get('features')[3].get('mood'), 'ok')
    assert.equal(provider.get('features')[4].get('name'), 'Travis CI Third Party Services')
    assert.equal(provider.get('features')[4].get('mood'), 'ok')
  })
})
