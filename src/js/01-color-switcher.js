function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function changeBodyBackgroundColor(color) {
  document.body.style.backgroundColor = color;
}

class ColorSwitcher {
  constructor(changeBackgroundColor, startBtnSelector, stopBtnSelector) {
    this.intervalID = undefined;
    this.changeBackgroundColor = changeBackgroundColor;
    this.startBtnRef = document.querySelector(startBtnSelector);
    this.stopBtnRef = document.querySelector(stopBtnSelector);
    this.stopBtnRef.disabled = true;

    this.startBtnRef.addEventListener('click', () => this.startChangeColor());
    this.stopBtnRef.addEventListener('click', () => this.stopChangeColor());
  }

  startChangeColor() {
    if (this.startBtnRef.disabled) {
      return;
    }

    this.startBtnRef.disabled = true;
    this.stopBtnRef.disabled = false;

    this.intervalID = setInterval(
      () => this.changeBackgroundColor(getRandomHexColor()),
      1000
    );
  }

  stopChangeColor() {
    this.startBtnRef.disabled = false;
    this.stopBtnRef.disabled = true;

    clearInterval(this.intervalID);
  }
}

const colorSwitcher = new ColorSwitcher(
  changeBodyBackgroundColor,
  'button[data-start]',
  'button[data-stop]'
);
