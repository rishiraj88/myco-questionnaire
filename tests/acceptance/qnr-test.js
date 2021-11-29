import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | qnr', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /qnr', async function (assert) {
    await visit('/qnr');

    assert.equal(currentURL(), '/qnr');
    
//    await this.pauseTest();
  });
});
