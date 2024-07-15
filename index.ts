import puppeteer from 'puppeteer';

async function main() {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto('https://www.ibilik.my/rooms/kuala_lumpur?location_search=2&location_search_name=Kuala%20Lumpur%2C%20Malaysia');

    await page.screenshot({path: 'ibilikcom.png'});

    await browser.close();
};

main();