import { moduleFor, test } from 'ember-qunit'

moduleFor('model:feature', 'Unit | feature', {
  unit: true
})

test('#name consists of provider name and feature name', function(assert) {
  const feature = this.subject()

  feature.set('providerName', null)
  feature.set('featureName', null)
  assert.equal(feature.get('name'), 'null null')

  feature.set('providerName', 'Github')
  feature.set('featureName', 'Website')
  assert.equal(feature.get('name'), 'Github Website')
})

test('#humanReadableMood is "Unknown" for undefined moods', function(assert) {
  const component = this.subject()

  component.set('mood', null)
  assert.equal(component.get('humanReadableMood'), 'Unknown')

  component.set('mood', 'unknown')
  assert.equal(component.get('humanReadableMood'), 'Unknown')

  component.set('mood', 'totally weird')
  assert.equal(component.get('humanReadableMood'), 'Unknown')
})

test('#humanReadableMood makes every known mood readable for humans', function(assert) {
  const component = this.subject()

  component.set('mood', 'initializing')
  assert.equal(component.get('humanReadableMood'), 'Loading...')

  component.set('mood', 'error')
  assert.equal(component.get('humanReadableMood'), 'Error!')

  component.set('mood', 'ok')
  assert.equal(component.get('humanReadableMood'), 'Operational')

  component.set('mood', 'warning')
  assert.equal(component.get('humanReadableMood'), 'Warning')

  component.set('mood', 'critical')
  assert.equal(component.get('humanReadableMood'), 'Major Outage')
})
