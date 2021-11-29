import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class QuestionsService extends Service {
  @tracked questionnaire;
  @tracked q_identifiers;
  @tracked currentQuestionIndex;
  @tracked previousQuestionIdentifier;
}
