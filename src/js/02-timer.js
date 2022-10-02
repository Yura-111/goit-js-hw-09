import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const myInput = document.querySelector("#datetime-picker");
const timeRef = document.querySelector('.timer');
const startBtn = document.querySelector('[data-start]');
const notifyOptions = {
        position: 'center-center',
        backOverlay: true,
        clickToClose: true,
    };

let TIMER_DEADLINE = null;

startBtn.setAttribute('disabled', 'disabled');

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        TIMER_DEADLINE = selectedDates[0];
        
        if (selectedDates[0] <= new Date()) {
            Notify.failure('Please choose a date in the future', notifyOptions);
            startBtn.setAttribute('disabled', 'disabled');
            } else {
            startBtn.removeAttribute('disabled');
            }
    },
};


flatpickr(myInput, options);

const timer = {
    intervalID: null,
    refs: {},

    start(rootRef, deadline) {
        this.intervalId = setInterval(() => {
        const delta = deadline.getTime() - Date.now();

        if (delta <= 1000) {
            clearInterval(this.intervalId);
            Notify.success('Mission accomplished!!!', notifyOptions);
        }
    
        const data = this.convertMs(delta);
        Object.entries(data).forEach(([name, value]) => {
        this.refs[name].textContent = this.twoCharacterNumber(value);
        });
        document.body.style.background = getRandomHexColor();
        }, 1000);
        this.getRefs(rootRef);
            Notify.success('START', notifyOptions);
        }, 

        twoCharacterNumber(value) {
            return String(value).padStart(2, '0');
        },
    
    getRefs(rootRef) {
        this.refs.days = rootRef.querySelector('[data-days]');
        this.refs.hours = rootRef.querySelector('[data-hours]');
        this.refs.minutes = rootRef.querySelector('[data-minutes]');
        this.refs.seconds = rootRef.querySelector('[data-seconds]');
    },

    convertMs(ms) {
        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;
        const days = Math.floor(ms / day);
        const hours = Math.floor((ms % day) / hour);
        const minutes = Math.floor(((ms % day) % hour) / minute);
        const seconds = Math.floor((((ms % day) % hour) % minute) / second);
    
        return { days, hours, minutes, seconds };
        },
    };
        
    function startBtnClick() {
        timer.start(timeRef, TIMER_DEADLINE);
    }

    startBtn.addEventListener('click', startBtnClick);



