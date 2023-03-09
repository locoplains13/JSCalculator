// Dom Elements
const hourEl = document.querySelector('.hour');
const minute = document.querySelector('.minute');

// set up the time
const updateTime = () => {
    const currentTime = new Date();

    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();

    hourEl.textContent = currentHour.toString();
    minute.textContent = currentMinute.toString();
}
setInterval(updateTime, 1000);
updateTime();