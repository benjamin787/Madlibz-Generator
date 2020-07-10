
const templateTitle = document.querySelector('#template-title');
const promptList = document.querySelector('#prompt-list');
const formList = document.querySelector('#form-list');
const answerList = document.querySelector('#answer-list');
const loadButton = document.querySelector('#template-load');
const resetButton = document.querySelector('#reset-button');
const titlePage = document.querySelector('#title-page');
const lists = document.querySelector('.lists');
const storyButton = document.querySelector('#story-button');

// [resetButton, loadButton].forEach(addEventListener('click', loadTemplate));

resetButton.addEventListener('click', loadTemplate)

loadButton.addEventListener('click', loadTemplate)

function displayTemplateTitle(template) {
    templateTitle.textContent = template.title;
}

function toggleVisibility() {
    resetButton.style.display = 'block';
    titlePage.style.display = 'none';
}

function parseJSON(response) {
    return response.json()
}

function loadTemplate(event) {
    event.preventDefault();
    toggleVisibility();
    
    
    //loading bar (in then?)
    
    fetch('http://madlibz.herokuapp.com/api/random?minlength=1&maxlength=5')
        .then(parseJSON)
        .then(displayTemplate)
        // .catch()
}

function createForm(blankWord) {
    let li = document.createElement('li')
    li.innerHTML = `<form>` +
                        `<input name='name' placeholder='${blankWord}' />` +
                        `<input type="submit" />` +
                    `</form>`;
    li.addEventListener('submit', optimisticRender);
    formList.appendChild(li);
}


function displayTemplate(template) {

    displayTemplateTitle(template);

    localStorage.setItem('values', JSON.stringify(template.value))


    template.blanks.forEach(createForm);
    storyButton.appendChild(createStoryButton());
}

function createStoryButton() {
    let button = document.createElement('button');
    button.textContent = "Let's see your masterpiece!";
    button.addEventListener('click', renderStory);
    return button
}


function renderStory(event) {
    event.preventDefault();
    createStory();
}

function createStory() {
    let valueList = JSON.parse(localStorage.getItem('values'));
    let story = '';
    for (let i = 0; i < (valueList.length-1); i++) {
        collectAnswers().forEach(answer => {
            story = story.concat(valueList[i] + ' ' + answer)
        });
    };
    clearScreen();
    appendStory(story);
}

function appendStory(story) {
    const p = document.createElement('p');
    p.textContent = story;
    lists.appendChild(p);
}

function collectAnswers() {
    let inputStorage = [];

    const inputList = answerList.getElementsByTagName('li');
    console.log(Array.from(inputList))
    Array.from(inputList).forEach(element => {
        console.log(typeof element.textContent)
        inputStorage.push(element.textContent);
    });
    // answerList.getElementsByTagName('li').forEach(input => {
    //     inputStorage.push(input);
    // })
    console.log(inputStorage)
    return inputStorage;
}

function clearScreen() {
    lists.innerHTML = '';
}


function optimisticRender(event) {
    event.preventDefault();
    
    const inputData = new FormData(event.target);
    const answer = inputData.get('name');
    
    let li = document.createElement('li');
    li.textContent = answer;
    
    answerList.appendChild(li);
    
    //if logged in, fetch performed here
    
    event.target.reset();
}



    // console.log(template)
    

    // let responseList = [];

    // template.blanks.forEach(input => {
    //     const form = document.createElement('form');
    //     formList.appendChild(form);
    //     const li = document.createElement('li');
    //     li.innerHTML = `<input name=${input} placeholder=${input} /> <br />`
    //     const submitButton = document.createElement('li');
    //     submitButton.innerHTML = "<input type='submit' />"
    //     form.append(li, submitButton);
    //     form.addEventListener('submit', () => {
    //         event.preventDefault();
    //         event.stopPropagation();
    //         let formData = new FormData(form);
    //         let value = formData.get(`${input}`);
    //         responseList.push(value);
    //         const answer = document.createElement('li')
    //         answer.textContent = value
    //         answerList.appendChild(answer);
    //     });
    // })
    // console.log(responseList)

    // template.blanks.forEach(input => {
    //     const li = document.createElement('li');
    //     li.innerHTML = `<input name=${input} placeholder=${input} /> <br />`
    //     promptList.appendChild(li);
    // });
    // const li = document.createElement('li');
    // li.innerHTML = "<input type='submit' />"
    // promptList.appendChild(li);

    // promptList.addEventListener('submit', () => {
    //     event.preventDefault()
    //     let formData = new FormData(promptList);
    
    //     console.log(formData)
    

    //     for (let i = 0; i < promptList.length; i++) {
    //         responseList.push(formData.flatten[i]);
    //     }
    
    //     // formData.values( value => {
    //     //     for (let i = 0; i < formData.values.length; i++) {
    //     //         responseList.push(value);
    //     //     }
    //     // }
    //     // )
    //     console.log(responseList)
    //     // return responseList;
    // })


