import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | questions', function (hooks) {
  setupTest(hooks);

  test('service exists', function (assert) {
    let service = this.owner.lookup('service:questions');
    assert.ok(service);
  });

  this.ids = ["list_12110962","list_12111610","list_12111777"];
  test('question identifiers are available', function (assert) {
    let service = this.owner.lookup('service:questions');
    service.q_identifiers = [...this.ids];
    assert.notEqual(
      service.q_identifiers.length,
      0,
      'Question identifier array is not empty.'
    );
  });
});
