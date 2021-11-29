import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class QuestionsComponent extends Component {
  @service('questions') questionsService; //Is it needed here
}
