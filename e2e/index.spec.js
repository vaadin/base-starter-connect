const {describe, it, beforeEach} = intern.getPlugin('interface.bdd');
const {expect} = intern.getPlugin('chai');

/**
 * Run a function periodically until it returns true.
 * If timeout is exceeded an error is thrown
 */
async function until(millisec, callback) {
  await setTimeout(() => {}, 20);
  if (await callback()) {
    return;
  } else if ((millisec -= 20)< 0) {
    throw Error('Timeout happened while waiting for condition');
  } else {
    await until(millisec, callback);
  }
}

describe('starter application', () => {
  describe('index page', () => {
    let page, greeting, nameInput;


    beforeEach(context => {
      page = context.remote.get('/index.html');
    });

    it('should have an empty greeting message', async() => {
      await page
        .findById('greeting').getVisibleText().then(text => {
          expect(text).to.be.empty;
        });
    });

    it('should show an error message when input is empty', async() => {
      await page
        .findById('greet').click().end()
        .findById('greeting').getVisibleText().then(text => {
          expect(text).to.equal('Enter a name first!');
        });
    });

    it('should show the greeting server message', async() => {
      await page
        .findById('nameInput').type('foo').end()
        .findById('greet').click().end();

      await until(5000, async() => {
        return await page
          .findById('greeting').getVisibleText()
          .then(text => text == 'Hello, foo!');
      });
    });
  });
});
