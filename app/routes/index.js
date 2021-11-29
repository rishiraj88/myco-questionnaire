import Route from '@ember/routing/route';

export default class IndexRoute extends Route {
  model() {
    const questionnaireId = 40;
    return questionnaireId;
  }
}
