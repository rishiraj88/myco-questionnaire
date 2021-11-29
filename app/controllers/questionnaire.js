import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';

export default class QuestionnaireController extends Controller {
  @tracked questionnaire;
  @tracked q_identifiers;
}
