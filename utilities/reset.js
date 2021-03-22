import { selectors } from './selectors.js'

function reset(element) {
  element.textContent = '';
}

function resetMain() {
  reset(selectors.formList);
  reset(selectors.answerList);
  reset(selectors.storyButton);
  reset(selectors.storyPlace);
}

export { reset, resetMain }