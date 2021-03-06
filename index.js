const puppeteer = require("puppeteer");

const path = require("path");

function sleep(duration) {
  return new Promise(resolve => setTimeout(resolve, duration));
}

// Make sure that the async/await code below makes node crash
process.on("unhandledRejection", up => {
  throw up;
});

// NOTE: Since the prettier config is using no-semicolons and this is an IIFE,
//       we are forced to have a semicolon to start this block.
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  page.setViewport({
    width: 1400,
    height: 600
  });

  page.on("pageerror", function(err) {
    console.log("Page error: " + err.toString());
    process.exit(1);
  });

  page.on("error", function(err) {
    console.log("Error during puppeteer instrumentation: " + err.toString());
    process.exit(2);
  });

  await page.goto("https://nteract.io/kernels", { waitUntil: "domcontentloaded" });

  await sleep(1000);

  await page.screenshot({ path: "screenshots/nteract-kernels.png" });

  await browser.close();
})();
