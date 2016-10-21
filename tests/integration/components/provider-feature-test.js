import { moduleForComponent, test } from 'ember-qunit'
import hbs from 'htmlbars-inline-precompile'
import Feature from 'statuspage/models/feature'

moduleForComponent('provider-feature', 'Integration | Component | provider feature', {
  integration: true
})

test('it renders name and mood', function (assert) {
  const feature = Feature.create({ providerName: 'Github', featureName: 'Webserver', mood: 'ok' })

  this.set('feature', feature)
  this.render(hbs`{{provider-feature feature=feature}}`)

  assert.equal(this.$('.c-provider-feature__name').text().trim(), 'Github Webserver')
  assert.equal(this.$('.c-provider-feature__mood').text().trim(), 'Operational')
  assert.equal(this.$('.c-provider-feature__comment').length, 0)
  assert.ok(this.$('.c-provider-feature').hasClass('c-provider-feature--ok'))
})

test('it renders comments', function (assert) {
  const feature = Feature.create({ providerName: 'Amazon', mood: 'error', comment: 'Kaboom' })

  this.set('feature', feature)
  this.render(hbs`{{provider-feature feature=feature}}`)

  assert.equal(this.$('.c-provider-feature__name').text().trim(), 'Amazon')
  assert.equal(this.$('.c-provider-feature__mood').text().trim(), 'Error!')
  assert.equal(this.$('.c-provider-feature__comment').text().trim(), 'Kaboom')
  assert.ok(this.$('.c-provider-feature').hasClass('c-provider-feature--error'))
})
