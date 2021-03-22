import { selectors } from './selectors.js'

function toggleVisibility() {
  selectors.resetButton.style.display = 'block';
  selectors.titlePage.style.display = 'none';
}

function parseJSON(response) {
  return response.json();
}

function saveStoryTemplate(template) {
  localStorage.clear();
  localStorage.setItem('values', JSON.stringify(template.value));
}

function optimisticRender(event) {
  event.preventDefault();
  
  const inputData = new FormData(event.target);
  const answer = inputData.get('name');
  
  let li = document.createElement('li');
  li.textContent = answer;
  
  selectors.answerList.appendChild(li);
  
  event.target.reset();
}

export { parseJSON, toggleVisibility, saveStoryTemplate, optimisticRender }