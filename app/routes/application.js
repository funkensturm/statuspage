import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    // github', 'heroku', 'digitalocean',
    return ['dnsimple', 'travis', 'pusher'].map((name) => {
      return this.store.createRecord('provider', {name: name});
    });
  }
});
