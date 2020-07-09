
const templateTitle = document.querySelector('#template-title')
const promptList = document.querySelector('#prompt-list')

fetch('http://madlibz.herokuapp.com/api/random')
    .then(response => response.json())
    .then(displayTemplate)

function displayTemplate(template) {

    console.log(template)
    
    templateTitle.textContent = template.title;

    template.blanks.forEach(input => {
        const li = document.createElement('li');
        li.innerHTML = `<input name=${input} placeholder=${input} /> <br />`
        promptList.appendChild(li);
    });
    const li = document.createElement('li');
    li.innerHTML = "<input type='submit' />"
    promptList.appendChild(li);

    promptList.addEventListener('submit', () => {
        event.preventDefault()
        let formData = new FormData(promptList);
    
        console.log(formData)
    
        let responseList = [];

        for (let i = 0; i < promptList.length; i++) {
            responseList.push(formData.flatten[i]);
        }
    
        // formData.values( value => {
        //     for (let i = 0; i < formData.values.length; i++) {
        //         responseList.push(value);
        //     }
        // }
        // )
        console.log(responseList)
        // return responseList;
    })
}

