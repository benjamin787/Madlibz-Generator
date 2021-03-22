import { reset, resetMain } from '../utilities/reset.js'
import { selectors } from '../utilities/selectors.js'

function appendStory(story) {
  const p = document.createElement('p');
  p.textContent = story;
  selectors.storyPlace.appendChild(p);
}

function collectAnswers() {
  let inputStorage = [];
  const inputList = selectors.answerList.getElementsByTagName('li');
  Array.from(inputList).forEach(element => {
      inputStorage.push(element.textContent);
  });
  return inputStorage;
}

function createStory() {
  let valueList = JSON.parse(localStorage.getItem('values'));
  let story = '';
  for (let i = 0; i < (valueList.length-1); i++) {
    story = story + valueList[i] + ' ' + collectAnswers()[i]
  };
  
  reset(selectors.instructions);
  resetMain();
  appendStory(story);
}

function renderStory(event) {
  event.preventDefault();
  createStory();
}

export default function createStoryButton() {
  reset(selectors.storyButton);
  let button = document.createElement('button');
  button.textContent = "Let's see your masterpiece!";
  button.addEventListener('click', renderStory);
  return button
}