import { Names } from '../../test-data/Names.js';
import { Surnames } from '../../test-data/Surnames.js';
import { paths } from './paths.js';
import * as fs from 'fs';

export class Commands {
  GetStringDate(MoreDays = 0) {
    const now = new Date();
    if (MoreDays > 0) {
      now.setDate(now.getDate() + MoreDays);
    }
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return now.toLocaleDateString('en-US', options);
  }

  RandomDigits(digits = 1) {
    const fdigit = Math.floor(Math.random() * 9) + 1;
    let rdigits = '';
    for (let i = 1; i < digits; i++) {
      rdigits += Math.floor(Math.random() * 10);
    }
    return parseInt(fdigit + rdigits, 10);
  }

  GetTime(Hours = 0, Minutes = 0) {
    const now = new Date();
    now.setHours(now.getHours() + Hours, now.getMinutes() + Minutes);
    const hours = now.getHours() % 12 || 12;
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const amPM = now.getHours() >= 12 ? 'PM' : 'AM';
    return `${hours}:${minutes} ${amPM}`.toString();
  }

  RandomName() {
    let length = Math.floor(Math.random() * Names.length);
    const name = Names[length];
    length = Math.floor(Math.random() * Surnames.length);
    let surname1 = Surnames[length];

    do {
      length = Math.floor(Math.random() * Surnames.length);
    } while (surname1 === Surnames[length]);

    const surname2 = Surnames[length];
    return `${name} ${surname1} ${surname2}`;
  }

  ULIDGenerator(StartWith = 'ULID_01', Length = 34) {
    const characters = 'abcdefghjklmnopqrstuvwxyz0123456789';
    if (!(StartWith.length < Length)) {
      throw new Error(`The length needs to be more than ${StartWith.length}`);
    }
    let ULID = StartWith;
    for (let i = 0; i < Length - StartWith.length; i++) {
      const RandomLetter = Math.floor(Math.random() * characters.length);
      ULID += characters[RandomLetter];
    }
    return ULID;
  }

  waitForEl(selector) {
    return new Promise(resolve => {
      if (document.querySelector(selector)) {
        return resolve(document.querySelector(selector));
      }
      const observer = new MutationObserver(mutations => {
        if (document.querySelector(selector)) {
          observer.disconnect();
          resolve(document.querySelector(selector));
        }
      });
      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });
    });
  }

  EmailGenerator(name) {
    name = name.toLowerCase();
    const Names = name.split(' ');
    if (Names.length < 3) {
      throw new Error('The name needs to have 3 parts.');
    }
    const email = `${Names[0].slice(0, 3)}.${Names[1].slice(0, 3)}_${Names[2].slice(0, 3)}@justworks.com`;
    return email;
  }

  DataPath(file) {
    const fullPath = path.join(paths.filesDir, file);
    if (!fs.existsSync(fullPath)) {
      throw new Error(`The file doesn't exist in Files Folder: ${file}`);
    }
    return fullPath;
  }

  async visit(page, url) {
    this.page = page;
    await Promise.all([this.page.goto(url), this.waitLoadPage(this.page, url)]);
  }

  async waitLoadPage(page, url) {
    this.page = page;
    await this.page.waitForURL(url);
  }

  async Wait(page, Milliseconds) {
    this.page = page;
    await this.page.waitForTimeout(Milliseconds);
  }

  async Refresh(page, url) {
    this.page = page;
    await this.Wait(this.page, 1500);
    await Promise.all([this.page.goto(url), this.page.waitForURL(url)]);
  }

  async PrintPage(page, name) {
    const PictureName = name.replace(/ /g, '_');
    const ScreenshotPath = `${paths.screenshotsDir}${PictureName}_print.png`;
    this.page = page;
    try {
      if (this.page) {
        console.log('Taking screenshot...');
        await this.page.screenshot({ path: ScreenshotPath, fullPage: true });
        console.log(ScreenshotPath);
      }
    } catch (error) {
      console.log('Error to take screenshot: ', error.message);
    }
  }
}

export const commands = new Commands();