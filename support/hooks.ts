import { Before, After, setDefaultTimeout } from "@cucumber/cucumber";

import { chromium } from "@playwright/test";

import { CustomWorld } from "./world";

setDefaultTimeout(30 * 1000);

Before(async function (this: CustomWorld) {
  this.browser = await chromium.launch({
    headless: process.env.HEADLESS !== "false",
  });

  this.context = await this.browser.newContext();

  await this.context.tracing.start({
    screenshots: true,
    snapshots: true,
  });

  this.page = await this.context.newPage();
});

After(async function (this: CustomWorld, scenario) {
  const tracePath = `test-results/${scenario.pickle.name.replace(
    /[^a-zA-Z0-9]/g,
    "-",
  )}.zip`;

  await this.context.tracing.stop({
    path: tracePath,
  });

  await this.page.close();
  await this.context.close();
  await this.browser.close();
});
