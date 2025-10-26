"use strict";

const checkBox = document.querySelector(".toggle-checkbox");
const tickTock = document.querySelector("audio");
const secondHandEl = document.querySelector(".second-hand");
const minuteHandEl = document.querySelector(".min-hand");
const hourHandEl = document.querySelector(".hour-hand");
const hands = document.querySelectorAll(".hand");
let isIntervalStarted = false;
const resetTransition = function () {
  hands.forEach((hand) => {
    hand.classList.add("transition-none");
  });
  setTimeout(function () {
    hands.forEach((hand) => {
      hand.classList.remove("transition-none");
    });
  }, 1000);
};
const setDate = function () {
  const now = new Date();
  const seconds = now.getSeconds();
  const minutes = now.getMinutes() * 60 + seconds;
  const hours = (now.getHours() % 12) * 60 * 60 + minutes + seconds;
  const secondHandDegree = (360 / 60) * seconds + 90;
  const minuteHandDegree = (360 / 3600) * minutes + 90;
  const hourHandDegree = (360 * hours) / 43200 + 90;
  secondHandEl.style.transform = `rotate(${secondHandDegree}deg)`;
  minuteHandEl.style.transform = `rotate(${minuteHandDegree}deg)`;
  hourHandEl.style.transform = `rotate(${hourHandDegree}deg)`;
  if (seconds === 0) resetTransition();
  if (15 < tickTock.currentTime && tickTock.currentTime < 16) tickTock.currentTime = 0.96;
  tickTock.play();
  checkBox.checked ? (tickTock.muted = false) : (tickTock.muted = true);
  if (!isIntervalStarted) {
    hands.forEach((hand) => {
      hand.style.display = "block";
    });
    isIntervalStarted = true;
  }
};

setInterval(setDate, 1000);
