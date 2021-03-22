import createStoryButton from './storyPage.js'
import { selectors } from '../utilities/selectors.js'
import { reset, resetMain } from '../utilities/reset.js'
import { parseJSON, toggleVisibility, saveStoryTemplate, optimisticRender } from '../utilities/utils.js'

function displayTemplateTitle(template) {
  selectors.templateTitle.textContent = template.title;
}

function createForm(blankWord) {
  let li = document.createElement('li')
  li.innerHTML = `<form>` +
                      `<input name='name' placeholder='${blankWord}' />` +
                      `<input type="submit" />` +
                  `</form>`;
  li.addEventListener('submit', optimisticRender);
  selectors.formList.appendChild(li);
}

function loadInstructions() {
  reset(selectors.instructions);
  const p = document.createElement('p');
  p.textContent = 'Fill in the boxes with the type of word mentioned.';
  selectors.instructions.appendChild(p);
}

function displayTemplate(template) {
  displayTemplateTitle(template);
  saveStoryTemplate(template);
  template.blanks.forEach(createForm);
  selectors.storyButton.appendChild(createStoryButton());
}

export default function loadTemplate(event) {
  event.preventDefault();
  toggleVisibility();
  resetMain();
  loadInstructions();
  
  fetch('http://madlibz.herokuapp.com/api/random?minlength=1&maxlength=5')
      .then(parseJSON)
      .then(displayTemplate)
}