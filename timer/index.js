let pomodoro = document.getElementById("pomodoro");
let buttons = document.querySelectorAll(".btn");
let short = document.getElementById("short");
let long = document.getElementById("long");
let btnStart = document.getElementById("btnStart");
let time = document.getElementById("time");
let rest = document.getElementById("restart");
let pause = document.getElementById("btnPause");

let set;
let active = "focus";
let count = 59;
let minCount = 24;
let paused = true;
btnStart.addEventListener("click", () => {
  rest.classList.add("show");
  pause.classList.add("show");
  btnStart.classList.add("hide");
  btnStart.classList.remove("show");
  if (paused) {
    paused = false;
    time.textContent = `${appendZero(minCount)}:${appendZero(count)}`;
    set = setInterval(() => {
      count--;
      time.textContent = `${appendZero(minCount)}:${appendZero(count)}`;
      if (count == 0) {
        if (minCount != 0) {
          minCount--;
          count = 60;
        } else {
          clearInterval(set);
        }
      }
    }, 1000);
  }
});
pomodoro.addEventListener("click", () => {
  removeFocus();
  pomodoro.classList.add("btn-focus");
  pauseTimer();
  minCount = 24;
  count = 59;
  time.textContent = `${minCount + 1}:00`;
});

time.textContent = `${minCount + 1}:00`;
const appendZero = (value) => {
  value = value < 10 ? `0${value}` : value;
  return value;
};
rest.addEventListener(
  "click",
  (resetTime = () => {
    pauseTimer();
    switch (active) {
      case "long":
        minCount = 14;
        break;
      case "short":
        minCount = 4;
        break;
      default:
        minCount = 24;
        break;
    }
    count = 59;
    time.textContent = `${minCount + 1}:00`;
  })
);
const removeFocus = () => {
  buttons.forEach((btn) => {
    btn.classList.remove("btn-pomodoro");
  });
};
 
short.addEventListener("click", () => {
  active = "short";
  removeFocus();
  short.classList.add("btn-pomodoro");
  pauseTimer();
  minCount = 4;
  count = 59;
  time.textContent = `${appendZero(minCount + 1)}:00`;
});
long.addEventListener("click", () => {
  active = "long";
  removeFocus();
  long.classList.add("btn-pomodoro");
  pauseTimer();
  minCount = 14;
  count = 59;
  time.textContent = `${minCount + 1}:00`;
});
pause.addEventListener(
  "click",
  (pauseTimer = () => {
    paused = true;
    clearInterval(set);
    btnStart.classList.remove("hide");
    pause.classList.remove("show");
    rest.classList.remove("show");
  })
);
