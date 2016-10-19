import { moduleForComponent, test } from 'ember-qunit'
import hbs from 'htmlbars-inline-precompile'
import Ember from 'ember'
import Pretender from 'pretender'

let server

moduleForComponent('provider-group', 'Integration | Component | provider group', {
  integration: true,
  beforeEach() {
    server = new Pretender()
  },
  afterEach() {
    server.shutdown()
  }
})

test('it renders', function(assert) {
  const provider = Ember.Object.create({ providerName: 'Github' })
  this.set('provider', provider)

  //const provider = this.get('store')
  //                   .createRecord('provider', {
  //                     providerType: 'github'
  //                   })
  //
  //
  const payload = [{ title: 'Foo' }];

  this.get('https://status.github.com/api/status.json', function(request){
     return [200, { "Content-Type": "application/json" }, JSON.stringify(payload)]
   });

  //server.get('https://status.github.com/api/status.json', json(200, payload), 300);

  this.set('provider', provider)
  this.render(hbs`{{provider-group provider=provider}}`)

  assert.equal(this.$('.c-provider-provider__name').text().trim(), 'Github Webserver')
  assert.equal(this.$('.c-provider-provider__mood').text().trim(), 'Operational')
  assert.equal(this.$('.c-provider-provider__comment').length, 0)
  assert.ok(this.$('.c-provider-provider').hasClass('c-provider-provider--ok'))
})
