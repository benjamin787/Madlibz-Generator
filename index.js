
const templateTitle = document.querySelector('#template-title')
const promptList = document.querySelector('#prompt-list')
const formList = document.querySelector('#form-list')
const answerList = document.querySelector('#answer-list')

fetch('http://madlibz.herokuapp.com/api/random?minlength=1&maxlength=20')
    .then(response => response.json())
    .then(displayTemplate)

function displayTemplate(template) {

    console.log(template)
    
    templateTitle.textContent = template.title;

    let responseList = [];

    template.blanks.forEach(input => {
        const form = document.createElement('form');
        formList.appendChild(form);
        const li = document.createElement('li');
        li.innerHTML = `<input name=${input} placeholder=${input} /> <br />`
        const submitButton = document.createElement('li');
        submitButton.innerHTML = "<input type='submit' />"
        form.append(li, submitButton);
        form.addEventListener('submit', () => {
            event.preventDefault();
            event.stopPropagation();
            let formData = new FormData(form);
            let value = formData.get(`${input}`);
            responseList.push(value);
            const answer = document.createElement('li')
            answer.textContent = value
            answerList.appendChild(answer);
        });
    })
    console.log(responseList)

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
}

