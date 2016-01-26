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

  assert.equal(this.$('.c-feature__name').text().trim(), 'Github Webserver');
  assert.equal(this.$('.c-feature__status').text().trim(), 'Operational');
  assert.ok(this.$('.c-feature__status').hasClass('c-feature__status--ok'));
});
