import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | question/navigator', function (hooks) {
  setupRenderingTest(hooks);

  test('nav renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    // await render(hbs`<Question::Navigator />`);

   //assert.dom('[data-test-nav]').hasText('test text for testing');//

    // Template block usage:
    // await render(hbs`
    //   <Question::Navigator>
    //   test text for testing
    //   </Question::Navigator>
    // `);
    // assert.dom('[data-test-nav]').hasText('test text for testing');//

    // assert.dom('[data-test-text]').hasText('Well done! Questionnaire Submitted!');
  });
});
