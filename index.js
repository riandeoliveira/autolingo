const interval = setInterval(() => {
  const continueButton = document.querySelector("._3HhhB");
  const checkBoxButtons = Array.from(document.querySelectorAll("._21Icd"));
  const optionsButtons = Array.from(document.querySelectorAll("._1rl91"));
  const buttonsList = Array.from(document.querySelectorAll(".WOZnx"));
  const leftButtons = buttonsList.slice(0, 5);
  const rightButtons = buttonsList.slice(5, 10);

  continueButton.click();

  checkBoxButtons.map((button) => button.click());
  optionsButtons.map((button) => button.click());

  if (buttonsList.length <= 5) {
    buttonsList.map((button) => button.click());
  } else {
    clearInterval(interval);

    let leftIndex = 0;
    let rightIndex = 0;

    setInterval(() => {
      leftButtons[leftIndex].click();
      rightButtons[rightIndex].click();

      if (rightIndex >= 4) {
        leftIndex++;
        rightIndex = 0;
      } else rightIndex++;

      const continueButton = document.querySelector("._3HhhB");

      continueButton.click();
    }, 1000);
  }
}, 0);
