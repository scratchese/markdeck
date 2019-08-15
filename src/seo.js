import puppeteer from 'puppeteer';
import path from 'path';

const screenshotUrlToImage = async (url, path) => {
  const SCALE = 320;
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({
    width: 2*SCALE,
    height: 1*SCALE,
    deviceScaleFactor: 1,
  });
  await page.goto(url);
  await page.screenshot({path});
 
  await browser.close();
}

export {screenshotUrlToImage};