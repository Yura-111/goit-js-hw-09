const startBtn = document.querySelector('[data-start]');
const stopStn = document.querySelector('[data-stop]');
let timerId = null;

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}


const changeColor = (event) => {
    timerId = setInterval(() => {
        document.body.style.background = getRandomHexColor();
        event.target.disabled = true;
    }, 1000);
}

startBtn.addEventListener('click', changeColor);


const stopChangeColor = () => {
    clearInterval(timerId);
    startBtn.removeAttribute('disabled');
}

stopStn.addEventListener('click', stopChangeColor);