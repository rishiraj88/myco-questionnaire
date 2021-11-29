import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import fade from 'ember-animated/transitions/fade';
import {easeOut, easeIn } from 'ember-animated/easings/cosine';

export default class QuestionsController extends Controller {
  @service('questions') questionsService;
  transition = fade;

  @tracked questions;
  @tracked q_identifiers =[];
  toJumpIdentifier;

  @tracked currentQuestionIndex = this.questionsService.currentQuestionIndex;
  @tracked currentQuestionIdentifier = this.model.identifier;
  @tracked previousQuestionIdentifier =
    this.questionsService.previousQuestionIdentifier;
  @tracked previousQuestionIndex =
    this.questionsService.currentQuestionIndex - 1;
  @tracked startDate = new Date();
  @tracked comments = '';
  @tracked toggle = 'tooltip';
  @tracked question;

  @tracked showThing =  true;

  @action
  toggleThing() {
    this.showThing = !this.showThing;
  }

  @action
  goToPreviousQuestion() {
    console.log('goToPreviousQuestion');
    console.log(`currentQuestionIndex old: ${this.currentQuestionIndex}`);
    if (0 < this.currentQuestionIndex) {
      console.log(
        `currentQuestionIdentifier old: ${this.currentQuestionIdentifier}`
      );
      console.log(
        `previousQuestionIdentifier old: ${this.previousQuestionIdentifier}`
      );
      console.log(`previousQuestionIndex old : ${this.previousQuestionIndex}`);
      let previousIndex = this.q_identifiers.findIndex(
        (ele) => ele === this.previousQuestionIdentifier
      );

      if (0 <= previousIndex) {
        this.currentQuestionIndex = previousIndex;
        console.log(`currentQuestionIndex new: ${this.currentQuestionIndex}`);
        this.model =
          this.questionsService.questionnaire.questions[
            this.currentQuestionIndex
          ];
        console.log(`this.model now for prev: ${this.model.identifier}`);
        this.currentQuestionIdentifier = this.model.identifier;
        console.log(
          `currentQuestionIdentifier new : ${this.currentQuestionIdentifier}`
        );
        console.log(`this.model.from: ${this.model.from}`);
        
        if(undefined === this.model.from && 0 < this.currentQuestionIndex) {
          this.model.from = this.q_identifiers[this.currentQuestionIndex - 1];
        }

        console.log(`this.model.from: ${this.model.from}`);
        this.previousQuestionIdentifier = this.model.from;
        console.log(
          `previousQuestionIdentifier new: ${this.previousQuestionIdentifier}`
        );
        this.previousQuestionIndex = this.q_identifiers.findIndex(
          (ele) => ele === this.previousQuestionIdentifier
        );
      }
      console.log(`previousQuestionIndex new: ${this.previousQuestionIndex}`);

      console.log(`this.model.question now: ${this.model.headline}`);
      this.startDate = this.model.startDate;
      this.comments = this.model.comments;
      this.toggle = 'tooltip';
    }
  }

  @action
  decideNextQuestionIdentifier() {
    console.log('decideNextQuestionIdentifier');
    const jumpOptions = this.model.jumps.length;
    let toJump = false;

    if (0 < jumpOptions) {
      for (var value of this.model.jumps) {
        if (
          undefined !== this.model.choices.find((ele) => ele.selected) &&
          this.model.choices.find((ele) => ele.selected).label ===
            value.conditions[0].value
        ) {
          this.toJumpIdentifier = value.destination.id;
          console.log(
            `this.model.jumps.destination.id: ${value.destination.id}`
          );
          toJump = true;
          break;
        }
      }
    }
    return toJump;
  }

  @action
  goToNextQuestion() {
    console.log(
      `currentQuestionIndex old in next: ${this.currentQuestionIndex}`
    );

    if (this.q_identifiers.length - 1 <= this.currentQuestionIndex) {
      console.log(`this.toggle in last: ${this.toggle}`);
      this.toggle = 'modal';
      console.log(`this.toggle now in last: ${this.toggle}`);
    } else {
      if (
        undefined !== this.model.jumps &&
        !this.decideNextQuestionIdentifier()
      ) {
        this.toggle = 'tooltip';
        console.log(`this.toggle now in gen: ${this.toggle}`);

        console.log(
          `currentQuestionIdentifier old in next: ${this.currentQuestionIdentifier}`
        );
        console.log(
          `previousQuestionIdentifier old in next: ${this.previousQuestionIdentifier}`
        );
        this.previousQuestionIdentifier = this.currentQuestionIdentifier;
        console.log(
          `previousQuestionIdentifier new in next: ${this.previousQuestionIdentifier}`
        );
        this.currentQuestionIndex += 1;
        console.log(
          `currentQuestionIndex new in next: ${this.currentQuestionIndex}`
        );

        this.currentQuestionIdentifier =
          this.q_identifiers[this.currentQuestionIndex];
        console.log(
          `currentQuestionIdentifier new in next: ${this.currentQuestionIdentifier}`
        );
      } else {
        this.currentQuestionIndex = this.q_identifiers.findIndex(
          (ele) => ele === this.toJumpIdentifier
        );
        this.previousQuestionIdentifier = this.currentQuestionIdentifier;
      }
      this.model =
        this.questionsService.questionnaire.questions[
          this.currentQuestionIndex
        ];
      this.currentQuestionIdentifier = this.model.identifier;

      this.model.from = this.previousQuestionIdentifier;

      console.log(
        `this.currentQuestionIdentifier now: ${this.model.identifier}`
      );

      console.log(`this.model.question now: ${this.model.headline}`);
      this.startDate = this.model.startDate;
      this.comments = this.model.comments;
    }
  }

  @action
  captureCheckedValueRadio(label) {
    console.log(`label: ${label}`);
    console.log(`this.currentQuestionIndex: ${this.currentQuestionIndex}`);
    console.log(`this.questionsService in q ctrlr: ${this.questionsService}`);
    for (var value of this.questionsService.questionnaire.questions[
      this.currentQuestionIndex
    ].choices) {
      value.selected = false;
      console.log(`value.selected: ${value.selected}`);
    }

    this.questionsService.questionnaire.questions[
      this.currentQuestionIndex
    ].choices.find((ele) => ele.label === label).selected = true;

    this.model =
      this.questionsService.questionnaire.questions[this.currentQuestionIndex];
    console.log(
      `this.model : ${this.model.choices.find((ele) => ele.selected).label}`
    );
  }

  @action
  captureCheckedValueCheckBox(label) {
    this.questionsService.questionnaire.questions[
      this.currentQuestionIndex
    ].choices.find((ele) => ele.label === label).selected = true;

    const lab = this.model.choices.find((ele) => ele.label === label).label;
    console.log(`lab: ${lab}`);

    this.model =
      this.questionsService.questionnaire.questions[this.currentQuestionIndex];
    console.log(
      `this.model : ${this.model.choices
        .find((ele) => ele.selected)
        .toString()}`
    );
  }

  @action
  readDate(value) {
    this.model.startDate = value;
    this.startDate = value;
  }

  @action
  readComments(value) {
    this.model.comments = value;
    this.comments = value;
  }
}
