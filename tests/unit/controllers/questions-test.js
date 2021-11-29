import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | questions', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('Questions controller exists', function (assert) {
    let controller = this.owner.lookup('controller:questions');
    assert.ok(controller);
  });

  test('The questionsService is available', function (assert) {
    const controller = this.owner.lookup('controller:questions');
    assert.ok(
      controller.questionsService,
      'The questionsService is not undefined.'
    );
  });

  test('qIdentifiers is available', function (assert) {
    const controller = this.owner.lookup('controller:questions');
    assert.ok(
      controller.q_identifiers,
      'qIdentifiers is available!'
    );  
  });
});
