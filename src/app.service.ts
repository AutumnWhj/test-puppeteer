import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer';

const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  async purchase(goodsId: string, authorizationToken: string): Promise<string> {
    const TARGET_URL = `https://h5.7881.com/pages/details/index?goodsId=${goodsId}`;

    const browser = await puppeteer.launch({ devtools: true });
    const page = await browser.newPage();

    // 设置Authorization token
    await page.goto(TARGET_URL);
    await page.evaluate((token: string) => {
      localStorage.setItem('Authorization', token);
    }, authorizationToken);
    await page.reload();

    // 点击底部立即购买按钮
    await page.waitForSelector('.bottom-right');
    const hasSales = await page.evaluate(() => {
      const el = document.querySelector('.bottom-right .u-btn');
      return !el.classList.contains('u-btn--primary--disabled');
    });

    if (!hasSales) {
      return '商品已下架或已售完';
    }

    await page.click('.bottom-right');
    // 判断手机 qq号码是否已经填写, 如果没则填入
    await page.waitForSelector('.uni-input-input');
    const inputElements = await page.$$('.uni-input-input');
    const phoneValue = await inputElements[0].getProperty('value');
    if ((await phoneValue.jsonValue()) === '') {
      await inputElements[0].type('13077776666');
    }
    const qqValue = await inputElements[1].getProperty('value');
    if ((await qqValue.jsonValue()) === '') {
      await inputElements[1].type('123456789');
    }

    // 判断是否同意了买家协议
    const isChecked = await page.evaluate(() => {
      const element = document.querySelector('.u-checkbox__icon-wrap--checked');
      return element !== null;
    });
    if (!isChecked) {
      await page.click('.u-checkbox__icon-wrap');
    }

    // 点击立即购买跳转收银台页面
    await sleep(1000);
    await page.click('.right-part .u-btn');

    await sleep(1000);
    await page.evaluate(async () => {
      const el: any = document.querySelector(
        '.uni-scroll-view-content .submit',
      );
      el.click();
    });

    await page.waitForNavigation();

    return page.evaluate(() => {
      return window.location.href;
    });
  }
}
