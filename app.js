let formElement = document.getElementById('form');
const errorMsg = document.querySelector('.error');

function handleSubmit(e) {
    e.preventDefault();
    const userInput = e.target[0].value;



    if (userInput[0] !== userInput[0].toUpperCase()) {
        errorMsg.style.display = 'block';
        errorMsg.innerHTML = `First letter must be uppercase.`
    } else if (userInput.length < 3) {
        errorMsg.style.display = 'block';
        errorMsg.innerHTML = `Username needs to be at least 3 characters`;
    }

    setTimeout(() => {
        errorMsg.innerHTML = '';
        errorMsg.style.display = 'none';
    }, 3000);

    if (userInput[0] === userInput[0].toUpperCase() && userInput.length >= 3) {
        if (localStorage.getItem('user') !== userInput) {
            localStorage.setItem('user', userInput);
            e.target[0].value = '';
            window.location.replace('cards.html');
        } else {
            localStorage.clear();
            localStorage.setItem('user', userInput);
            e.target[0].value = '';
            window.location.replace('cards.html');
        }
    }
}

if (formElement !== null) {
    formElement.addEventListener('submit', handleSubmit);
};

