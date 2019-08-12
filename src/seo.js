import puppeteer from 'puppeteer';
import path from 'path';

const screenshotUrlToImage = async (url, path) => {
  const SCALE = 40;
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({
    width: 16*SCALE,
    height: 16*SCALE,
    deviceScaleFactor: 1,
  });
  await page.goto(url);
  await page.screenshot({path});
 
  await browser.close();
}

export {screenshotUrlToImage};