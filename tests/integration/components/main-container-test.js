import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | main-container', function (hooks) {
  setupRenderingTest(hooks);

  test('main con renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    this.set('comments', 'new comments to test');

    await render(hbs`<MainContainer/>`);
    //    assert.dom('[data-test-textarea]').exists();
    assert.dom('textarea').exists();

    //await this.pauseTest();
  });

  test('it has text', async function (assert) {
    this.set('comments', 'new comments to test');
    // Template block usage:
    await render(hbs`
      <MainContainer @comments={{this.comments}}>
      {{yield}}
      </MainContainer>
    `);

    assert.dom('textarea').hasText('new comments to test');
    // assert.dom('[data-test-textarea1]').hasText('new comments to test');
    // assert.dom(this.element).hasText('template block text');
  });
});
