import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class QuestionsRoute extends Route {
  @service('questions') questionsService;
  @tracked questions;
  @tracked currentQuestionIdentifier;
  @tracked previousQuestionIdentifier;
  @tracked q_identifiers;

  async model(params) {    //question
    console.log(
      `questionsService.questionnaire: ${this.questionsService.questionnaire}`
    );
    console.log(`params in q route: ${params}`);
    console.log(`params in q route: ${params.identifier}`);
    let question = params;
    console.log(`q params in q route: ${question.headline}`);

    if (undefined === this.questionsService.questionnaire) {
      const response = await fetch('/questionnaire.json');
      const { questionnaire } = await response.json();
      this.questionsService.questionnaire = questionnaire;
      this.questionsService.q_identifiers = [];
      questionnaire.questions.forEach((question) =>
        this.questionsService.q_identifiers.push(question.identifier)
      );
      question = this.questionsService.questionnaire.questions.find(
        (ele) => ele.identifier === params.identifier
      );
      console.log(`model found is: ${question.identifier}`);
      console.log(`model found is: ${question.headline}`);
    }
    console.log(
      `this.questionsService.questionnaire in q route: ${this.questionsService.questionnaire}`
    );

    console.log(
      `questionsService.qs in q route: ${this.questionsService.questionnaire.questions}`
    );
    this.q_identifiers = this.questionsService.q_identifiers;

    console.log(`question now in q route: ${question.headline} `);
    return question;
  }

  setupController(controller, model) {
    super.setupController(controller, model);
    console.log(`model in q route: ${model.headline}`);
    console.log(      `questionsService.qnr in q route setup: ${this.questionsService.questionnaire.identifier}`
    );
    console.log(      `this.questionsService in q route setup: ${this.questionsService}`
    );
    this.questionsService.currentQuestionIndex =
      this.questionsService.q_identifiers.findIndex(
        (ele) => ele === model.identifier
      );

    console.log(
      `questionsService.currentQuestionIndex in q route setup: ${this.questionsService.currentQuestionIndex}`
    );

    controller.questionsService = this.questionsService;
    console.log(
      `controller.questionsService in q route setup: ${controller.questionsService}`
    );
    console.log(`controller.questionsService.q_identifiers 
    in q route setup: ${controller.questionsService.q_identifiers}`);
    controller.q_identifiers = controller.questionsService.q_identifiers;
    console.log(
      `controller.q_identifiers in q route: ${controller.q_identifiers}`
    );

    this.model.from = null; //sentinel
    if (0 < this.questionsService.currentQuestionIndex)
      this.model.from =
        controller.q_identifiers[
          this.questionsService.currentQuestionIndex - 1
        ];
    this.questionsService.previousQuestionIdentifier = this.model.from;
    console.log(
      `questionsService.previousQuestionIdentifier in q route: ${this.questionsService.previousQuestionIdentifier}`
    );
  }

  redirect(model, transition) {
    this.transitionTo('questions', model);
  }
}
