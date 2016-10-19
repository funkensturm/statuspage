import { moduleForModel, test } from 'ember-qunit'

moduleForModel('provider', 'Unit | Model | provider', {
  needs: ['service:ajax', 'service:fetcher', 'provider:github']
})

test('starts with an `initializing` lifecycle', function(assert) {
  const provider = this.subject()

  assert.equal(provider.get('lifecycle'), 'initializing')
})

test('can be set into lifecycle state `error`', function(assert) {
  const provider = this.subject()
  assert.equal(provider.get('comment'), '')
  provider.failed('Kaboom')
  assert.equal(provider.get('lifecycle'), 'error')
  assert.equal(provider.get('comment'), 'Kaboom')
})

test('fetching data demands a providerType', function(assert) {
  const provider = this.subject()
  provider.fetchUpstream()
  assert.equal(provider.get('lifecycle'), 'error')
  assert.ok(provider.get('comment').includes('needs to have an ID'))
  assert.equal(provider.get('name'), 'Unknown')
})
