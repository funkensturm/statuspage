import { moduleForModel, test } from 'ember-qunit'
import Pretender from 'pretender'
import wait from 'ember-test-helpers/wait'

import JsonFixture from 'statuspage/tests/helpers/json-fixture'

let server

moduleForModel('provider', 'Unit | Model | provider', {
  needs: ['service:ajax', 'service:fetcher', 'provider:heroku'],
  beforeEach () {
    server = new Pretender(function () {
      this.get('/**', this.passthrough)
    })

    server.handledRequest = function (verb, path, request) {
      console.warn(`Pretender intercepted ${verb} ${path}`)
    }

    server.unhandledRequest = function (verb, path, request) {
      console.log(`Pretender ignores ${verb} ${path}`)
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

test('#fetchUpstream loads remote data for github', function (assert) {
  JsonFixture.load('heroku-all-green').done((payload) => {
    server.get('https://status.heroku.com/api/v3/current-status', (request) => {
      return [200, { 'Content-Type': 'application/json' }, JSON.stringify(payload)]
    })
  })

  const provider = this.subject({ providerType: 'heroku' })
  provider.fetchUpstream()

  return wait().then(function () {
    assert.equal(provider.get('name'), 'Heroku')
    assert.equal(provider.get('features').length, 2)
    assert.equal(provider.get('features')[0].get('name'), 'Heroku Production')
    assert.equal(provider.get('features')[1].get('name'), 'Heroku Development')
  })
})
