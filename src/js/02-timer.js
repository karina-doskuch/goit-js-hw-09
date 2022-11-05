import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startBtnRef = document.querySelector('button[data-start]');
startBtnRef.disabled = true;

const daysValueRef = document.querySelector('span[data-days]');
const hoursValueRef = document.querySelector('span[data-hours]');
const minutesValueRef = document.querySelector('span[data-minutes]');
const secondsValueRef = document.querySelector('span[data-seconds]');

let selectedDateMs;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectDate(selectedDates[0]);
  },
};

const dateTimePickerRef = document.querySelector('input#datetime-picker');
flatpickr(dateTimePickerRef, options);

function selectDate(selectedDate) {
  const currentDate = new Date();
  if (selectedDate <= currentDate) {
    startBtnRef.disabled = true;
    Notify.failure('Please choose a date in the future');
  } else {
    startBtnRef.disabled = false;
    selectedDateMs = selectedDate.getTime();
  }
}

startBtnRef.addEventListener('click', () => {
  dateTimePickerRef.disabled = true;
  startBtnRef.disabled = true;
  setInterval(() => updateTimer(), 1000);
});

function updateTimer() {
  const currentDateMs = new Date().getTime();
  const remainMs = selectedDateMs - currentDateMs;
  const remainingDate = convertMs(remainMs);

  daysValueRef.innerHTML = addLeadingZero(remainingDate.days);
  hoursValueRef.innerHTML = addLeadingZero(remainingDate.hours);
  minutesValueRef.innerHTML = addLeadingZero(remainingDate.minutes);
  secondsValueRef.innerHTML = addLeadingZero(remainingDate.seconds);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  const stringValue = value.toString();
  if (stringValue.length > 1) {
    return stringValue;
  }

  return stringValue.padStart(2, '0');
}
