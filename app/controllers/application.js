import Ember from 'ember';

export default Ember.Controller.extend({
  services: ['dnsimple', 'travis'] // github', 'heroku', 'digitalocean',
});
