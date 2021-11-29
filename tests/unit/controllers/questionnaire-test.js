import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | questionnaire', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let controller = this.owner.lookup('controller:questionnaire');
    assert.ok(controller);
  });

  test('Questionnaire is available', function (assert) {
    const controller = this.owner.lookup('controller:questionnaire');
    assert.ok(
      controller.questionnaire,
      'Questionnaire is not undefined.'
    );
  });
});