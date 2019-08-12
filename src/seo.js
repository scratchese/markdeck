import puppeteer from 'puppeteer';
import path from 'path';

const screenshotUrlToPNG = async (url, path) => {
  const SCALE = 60;
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({
    width: 16*SCALE,
    height: 9*SCALE,
    deviceScaleFactor: 1,
  });
  await page.goto(url);
  await page.screenshot({path});
 
  await browser.close();
}

export {screenshotUrlToPNG};