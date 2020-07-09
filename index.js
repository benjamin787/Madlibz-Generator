
const templateTitle = document.querySelector('#template-title');
const promptList = document.querySelector('#prompt-list');
const formList = document.querySelector('#form-list');
const answerList = document.querySelector('#answer-list');
const loadButton = document.querySelector('#template-load');
const resetButton = document.querySelector('#reset-button');

[resetButton, loadButton].forEach(addEventListener('click', loadTemplate));

// resetButton.addEventListener('click', loadTemplate)

// loadButton.addEventListener('click', loadTemplate)

function displayTemplateTitle(template) {
    templateTitle.textContent = template.title;
}

function toggleVisibility(event) {
    let node = event.target;
    if (node.style.display === 'none') {
        node.style.display = 'block';
    } else {
        node.style.display = 'none';
    }
}

function parseJSON(response) {
    return response.json()
}

function loadTemplate(event) {
    event.preventDefault();
    
    toggleVisibility(event);
    // event.target.remove();
    
    //loading bar (in then?)
    
    fetch('http://madlibz.herokuapp.com/api/random?minlength=1&maxlength=5')
        .then(parseJSON)
        .then(displayTemplate)
        // .catch()
}

function displayTemplate(template) {

    console.log(template)

    displayTemplateTitle(template);


    
    template.blanks.forEach(createForm)

    console.log(formList)
}

function createForm(blankWord) {

    //may have to break input and submit into different elements

    const li = document.createElement('li');
    li.innerHTML = `<form>
                        <input name=${blankWord} placeholder=${blankWord} />
                        <input type='submit' />
                    </form>`
    li.addEventListener('submit', optimisticRender);
    formList.appendChild(li);
}


function optimisticRender(event) {
    const inputData = new FormData(event.target);
    const answer = inputData.get('name');
    answerList.appendChild(answer);

    //should empty form after render

    //if logged in, fetch performed here
    
    event.target.reset();

    console.log(answer)
    console.log(answerList)
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


