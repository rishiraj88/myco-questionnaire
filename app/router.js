import EmberRouter from '@ember/routing/router';
import config from 'myco-questionnaire/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('questionnaire', { path: '/questionnaire/:questionnaire_id' });
  this.route('questions', { path: '/questions/:identifier' });
  this.route('not-found', { path: '/*path' });
});
