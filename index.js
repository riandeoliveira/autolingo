const dotenv = require("dotenv");
const puppeteer = require("puppeteer");

dotenv.config();

const pages = {
  auth: "https://www.duolingo.com/?isLoggingIn=true",
  story: "https://www.duolingo.com/stories/en-pt-a-date?mode=read",
};

const selectors = {
  email: "input[type='text']",
  password: "input[type='password']",
  submit: "button[type='submit']",
};

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--start-maximized"],
    defaultViewport: null,
  });

  const authPage = await browser.newPage();
  await authPage.goto(pages.auth);

  await authPage.waitForSelector(".WOZnx");
  await authPage.click(".WOZnx");

  await authPage.waitForTimeout(5000);

  await authPage.type(selectors.email, process.env.EMAIL);
  await authPage.type(selectors.password, process.env.PASSWORD);
  await authPage.click(selectors.submit);

  await authPage.waitForTimeout(5000);

  const storyPage = await browser.newPage();
  await storyPage.goto(pages.story);

  await storyPage.evaluate(() => {
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
  });

  await storyPage.waitForTimeout(100000);

  await browser.close();
})();
