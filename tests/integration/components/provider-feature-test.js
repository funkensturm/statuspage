import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('provider-feature', 'Integration | Component | provider feature', {
  integration: true
});

test('it renders', function(assert) {
  const provider = Ember.Object.create({ displayName: 'Github' })
  const feature  = Ember.Object.create({ provider: provider, mood: 'ok', name: 'Webserver', status: 'Operational' })

  this.set('feature', feature);

  this.render(hbs`
    {{provider-feature feature=feature}}
  `);

  assert.equal(this.$('.c-provider-feature__name').text().trim(), 'Github Webserver');
  assert.equal(this.$('.c-provider-feature__status').text().trim(), 'Operational');
  assert.ok(this.$('.c-provider-feature__status').hasClass('c-provider-feature__status--ok'));
});
