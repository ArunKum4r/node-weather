console.log('Client side JavaScript file is loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msgOne = document.querySelector('#msg-1')
const msgTwo = document.querySelector('#msg-2')

// msgOne.textContent = 'From JavaScript'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    console.log(location)

    msgOne.textContent = 'Loading...'
    msgTwo.textContent = ''

    fetch('http://localhost:3000/weather?address='+location+'').then((response) => {
    response.json().then((data) => {
        if(data.error) {
            msgOne.textContent = data.error
        } else {
            msgOne.textContent = data.location
            msgTwo.textContent = data.forecast
        }
    })
})
})