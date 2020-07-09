document.addEventListener('DOMContentLoaded', () => {

    const promptList = document.querySelector('#prompt-list')

    fetch('http://madlibz.herokuapp.com/api/random')
        .then(response => response.json())
        .then(displayTemplate)

    function displayTemplate(response) {
        console.log(response)
        response.blanks.forEach(input => {
            const li = document.createElement('li')
            li.textContent = input
            promptList.appendChild(li)

        })
    }
})