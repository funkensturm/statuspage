import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('digitalocean-status', 'Integration | Component | digitalocean status', {
  integration: true
});

test('it renders', function(assert) {
  
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{digitalocean-status}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:" + EOL +
  this.render(hbs`
    {{#digitalocean-status}}
      template block text
    {{/digitalocean-status}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
