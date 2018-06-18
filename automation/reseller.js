const puppeteer = require('puppeteer');
const delay = require ('delay');

(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto('https://reseller.adobe.com');
  console.log('Adobe Login Page');

  await page.waitForNavigation({timeout:40000}).then(()=>{},()=>{
	console.log('url fail load');
  });

  await delay(10000);
  await page.type('#adobeid_username', 'arun@aisplglobal.com');
  await page.click('body');
  await delay(4000);
  await page.type('#adobeid_password', 'AispleStore@39$');
  console.log('Username Passwords are entered.');

  await page.click('#sign_in');
  console.log('LoggedIn');

  await delay(15000);
  await page.evaluate(() => {
  	return document.querySelectorAll('a[ui-sref="customers.defaultSegment"]')[0].click();
  });
  console.log('Customer Page');

  await delay(2000)
  await page.evaluate(() => {
  	return document.querySelectorAll('a[href="/customers/all"]')[0].click();
  });
  console.log('All customers');

  await delay(10000);
  await page._client.send('Page.setDownloadBehavior', {behavior: 'allow', downloadPath: '/node/files'});
  await page.evaluate(() => {
  	return document.querySelectorAll('button[title="Download as CSV"]')[0].click();
  });
  console.log("File Downloaded for All Customers");

  await page.screenshot({path: 'screenshots/screenshot1.png'});
  // await browser.close();
})();