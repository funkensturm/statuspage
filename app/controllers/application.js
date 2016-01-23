import Ember from 'ember';

export default Ember.Controller.extend({
  services: ['dnsimple', 'travis', 'pusher'] // github', 'heroku', 'digitalocean',
});
