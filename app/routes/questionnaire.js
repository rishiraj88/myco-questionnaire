import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class QuestionnaireRoute extends Route {
  @service('questions') questionsService;
  @tracked questionnaire;

  @tracked q_identifiers;

  async model(params) {    //identifier
    const { id } = params;
    console.log(`qnr id from params: ${id}`);

    const response = await fetch('/questionnaire.json');
    const { questionnaire } = await response.json();
    console.log(`questionnaire.id in qnr route: ${questionnaire.id}`);
    this.questionnaire = questionnaire;
    this.questionsService.questionnaire = questionnaire;
    this.questions = questionnaire.questions;

    if (undefined === this.q_identifiers) this.q_identifiers = [];
    questionnaire.questions.forEach((question) =>
      this.q_identifiers.push(question.identifier)
    );
    console.log(
      `q_identifiers array in qnr route: ${this.q_identifiers.toString()}`
    );
    this.questionsService.q_identifiers = [...this.q_identifiers];

    questionnaire.category_name_hyphenated = questionnaire.category_name_hyphenated.replaceAll('&shy;', '\u00AD');
    console.log(`qnr hyp: ${questionnaire.category_name_hyphenated}`);
    this.questionsService.questionnaire = questionnaire;
    return questionnaire;
  }
  setupController(controller, model) {
    super.setupController(controller, model);
    controller.model = model;

    controller.questionnaire = this.questionsService.questionnaire; //
    controller.questionsService = this.questionsService;
    controller.questionsService.q_identifiers = this.q_identifiers;
    console.log(`this.questionsService in qnr route: ${this.questionsService}`);
    console.log(`this.questionsService.questionnaire in qnr route: ${this.questionsService.questionnaire.id}`);
    console.log(`this.questionsService.questionnaire.questions in qnr route: ${this.questionsService.questionnaire.questions[0].identifier}`);
    console.log(`this.questionsService.q_identifiers in qnr route: ${this.questionsService.q_identifiers}`);
    console.log(`controller.questionnaire now in qnr route: ${controller.questionnaire}`);
    
    this.questionsService.questionnaire.category_name_hyphenated = 
    this.questionsService.questionnaire.category_name_hyphenated.replaceAll('/&shy;', '\u00AD');
    console.log(`qnr hyp: ${this.questionsService.questionnaire.category_name_hyphenated}`);
  }
}
