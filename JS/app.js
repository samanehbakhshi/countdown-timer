class CountDown {
  constructor(expiredDate, onRender, oncomplete) {
    this.setExpiredDate(expiredDate);
    this.onRender = onRender;
    this.oncomplete = oncomplete;
  }

  setExpiredDate(expiredDate) {
    // get current time
    const currentTime = new Date().getTime();
    // calculate remaining time
    this.remainingTime = expiredDate.getTime() - currentTime;

    if (this.remainingTime > 0) {
      this.start();
    } else {
      this.complete();
    }
  }
  start() {
    // update countdown
    this.update();
    // set a timer
    this.interValid = setInterval(() => {
      // update timer
      this.remainingTime -= 1000;
      if (this.remainingTime < 0) {
        // call callback
        this.complete();
        // clear interval if expired
        clearInterval(this.interValid);
      } else {
        this.update();
      }
    }, 1000);
  }
  update() {
    if (typeof this.onRender === "function") {
      this.onRender(this.getTime());
    }
  }
  getTime() {
    return {
      days: Math.floor(this.remainingTime / 1000 / 60 / 60 / 24),
      hours: Math.floor(this.remainingTime / 1000 / 60 / 60) % 24,
      minutes: Math.floor(this.remainingTime / 1000 / 60) % 60,
      seconds: Math.floor(this.remainingTime / 1000) % 60,
    };
  }
}

const getNewYear = () => {
  const currentYear = new Date().getFullYear();
  return new Date(`january 01 ${currentYear + 1} 00:00:00`);
};

const format = (t) => {
  return t < 10 ? "0" + t : t;
};

const complete = () => {
  showMessage();
  // restart the countdown after showing greeting message for a day
  setTimeout(() => {
    hideMessage();
    countdownTimer.setExpiredDate(getNewYear());
  }, 1000 * 60 * 24);
};

//update the year element
const year = document.querySelector(".year");
const newYear = getNewYear().getFullYear();
year.innerHTML = newYear;

// select elements
const app = document.querySelector(".countdown-timer");
const message = document.querySelector(".message");
const heading = document.querySelector("h1");

const render = (time) => {
  app.innerHTML = `
  <div class="count-down">
  <div class="timer">
    <h2 class="days">${format(time.days)}</h2>
    <small>Days</small>
  </div>
  <div class="timer">
    <h2 class="hours">${format(time.hours)}</h2>
    <small>Hours</small>
  </div>
  <div class="timer">
    <h2 class="minutes">${format(time.minutes)}</h2>
    <small>Minutes</small>
  </div>
  <div class="timer">
    <h2 class="seconds">${format(time.seconds)}</h2>
    <small>Seconds</small>
  </div>
</div>
  `;
};

const showMessage = () => {
  message.innerHTML = `Happy New Year ${getNewYear.getFullYear()}!`;
  app.innerHTML = "";
  heading.style.display = "none";
};

const hideMessage = () => {
  message.innerHTML = "";
  heading.style.display = "block";
};

const countdownTimer = new CountDown(getNewYear(), render, complete);
