let startTime = null;
let elapsedTime = 0;
let timerInterval = null;
let isRunning = false;
let laps = [];

const display = document.getElementById("display");
const startPauseBtn = document.getElementById("startPauseBtn");
const lapBtn = document.getElementById("lapBtn");
const stopBtn = document.getElementById("stopBtn");
const resetBtn = document.getElementById("resetBtn");
const lapsList = document.getElementById("laps");

startPauseBtn.addEventListener("click", () => {
  if (!isRunning) {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateDisplay, 10); // update every 10ms
    startPauseBtn.textContent = "Pause";
    isRunning = true;
  } else {
    clearInterval(timerInterval);
    elapsedTime = Date.now() - startTime;
    startPauseBtn.textContent = "Start";
    isRunning = false;
  }
});

lapBtn.addEventListener("click", () => {
  if (isRunning) {
    const lapTime = display.textContent;
    const li = document.createElement("li");
    li.textContent = `Lap ${laps.length + 1}: ${lapTime}`;
    lapsList.appendChild(li);
    laps.push(lapTime);
  }
});

stopBtn.addEventListener("click", () => {
  clearInterval(timerInterval);
  display.textContent = "00:00:00.00";
  startPauseBtn.textContent = "Start";
  elapsedTime = 0;
  isRunning = false;
});

resetBtn.addEventListener("click", () => {
  clearInterval(timerInterval);
  display.textContent = "00:00:00.00";
  startPauseBtn.textContent = "Start";
  elapsedTime = 0;
  isRunning = false;
  laps = [];
  lapsList.innerHTML = "";
});

function updateDisplay() {
  const currentTime = Date.now();
  elapsedTime = currentTime - startTime;

  let hours = Math.floor(elapsedTime / 3600000);
  let minutes = Math.floor((elapsedTime % 3600000) / 60000);
  let seconds = Math.floor((elapsedTime % 60000) / 1000);
  let milliseconds = Math.floor((elapsedTime % 1000) / 10); // hundredths

  display.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds)}`;
}

function pad(number) {
  return number < 10 ? "0" + number : number;
}
