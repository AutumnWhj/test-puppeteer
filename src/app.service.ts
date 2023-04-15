import { Injectable } from '@nestjs/common';
import puppeteer, { Page } from 'puppeteer';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  async purchase(goodsId: string, authorizationToken: string): Promise<string> {
    const TARGET_URL = `https://h5.7881.com/pages/details/index?goodsId=${goodsId}`;

    const browser = await puppeteer.launch({ devtools: true });
    const page = await browser.newPage();

    // 模拟 iPhone X 设备
    // await page.emulate(puppeteer.devices['iPhone X']);

    // 设置Authorization token
    await page.goto(TARGET_URL);
    await page.evaluate((token: string) => {
      localStorage.setItem('Authorization', token);
    }, authorizationToken);
    await page.reload();

    // 点击底部立即购买按钮
    await page.waitForSelector('.bottom-right');
    console.log('准备点击立即购买按钮');
    await page.click('.bottom-right');
    console.log('已点击立即购买按钮');
    // 自动跳转到创建订单页
    // 判断手机号码是否已经填写
    // 判断qq号码是否已经填写
    // 判断是否同意了买家协议
    // 等待新页面加载
    await page.waitForNavigation();
    await page.waitForSelector('.uni-input-input');
    await page.evaluate(async () => {
      const Node: any = Array.from(
        document.querySelectorAll('.right-box > .fill-input .uni-input-input'),
      );
      const [phoneNode, qqNode, codeNode] = Node;
      console.log(12312312, Node);
      phoneNode.value = '13077776666';
      qqNode.value = '123456789';
      codeNode.value = '33';
      return true;
    });

    console.log('准备点击立即购买按钮');
    // await page.click('.bottom-right');
    // let isAgreed = await page.evaluate(() => {
    //   return document.querySelector('#agreement-checkbox').checked;
    // });
    // if (!isAgreed) {
    //   // 自动勾选同意买家协议
    //   await page.click('#agreement-checkbox');

    //   // 提交订单前确认购买
    //   const [confirmButton] = await page.$x(
    //     '//button[contains(text(), "确认购买")]',
    //   );
    //   if (confirmButton) {
    //     await confirmButton.click();
    //   }

    //   // 再次检查是否同意了买家协议
    //   await page.waitForSelector('#submit-order-button');
    //   isAgreed = await page.evaluate(() => {
    //     return document.querySelector('#agreement-checkbox').checked;
    //   });
    //   if (!isAgreed) {
    //     throw new Error('Buyer agreement not agreed');
    //   }
    // }

    // // 提交订单并获取订单号
    // await page.click('#submit-order-button');
    // await page.waitForSelector('.payment-success-page');
    // const orderNumber = await page.evaluate(() => {
    //   return document.querySelector('.order-number').textContent;
    // });

    // await browser.close();
    return '222222222';
    // return orderNumber;
  }
}
