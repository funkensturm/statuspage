import { moduleForModel, test } from 'ember-qunit'

moduleForModel('provider', 'Unit | Model | provider', {
  needs: ['service:ajax', 'service:fetcher', 'provider:github']
})

test('#lifecycle is `initializing`', function(assert) {
  const provider = this.subject()
  assert.equal(provider.get('lifecycle'), 'initializing')
})

test('#failed transitions into lifecycle state `error`', function(assert) {
  const provider = this.subject()
  assert.equal(provider.get('comment'), '')
  provider.failed('Kaboom')
  assert.equal(provider.get('lifecycle'), 'error')
  assert.equal(provider.get('comment'), 'Kaboom')
})

test('#providerType must be present', function(assert) {
  const provider = this.subject()
  provider.fetchUpstream()
  assert.equal(provider.get('lifecycle'), 'error')
  assert.ok(provider.get('comment').includes('needs to have an ID'))
  assert.equal(provider.get('name'), 'Unknown')
})

test('#providerType must be known', function(assert) {
  const provider = this.subject({ providerType: 'skywalker' })
  provider.fetchUpstream()
  assert.equal(provider.get('lifecycle'), 'error')
  assert.ok(provider.get('comment').includes('invalid'))
  assert.ok(provider.get('comment').includes('skywalker'))
  assert.ok(provider.get('comment').includes('must correspond to a filename'))
  assert.equal(provider.get('name'), 'Skywalker')
})

test('#providerType must be known', function(assert) {
  const provider = this.subject({ providerType: "line\nbreaker" })
  provider.fetchUpstream()
  assert.equal(provider.get('lifecycle'), 'error')
  assert.ok(provider.get('comment').includes('invalid'))
  assert.ok(provider.get('comment').includes('linebreaker'))
  assert.ok(provider.get('comment').includes('must correspond to a filename'))
  assert.equal(provider.get('name'), 'Linebreaker')
})
