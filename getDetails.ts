import puppeteer from 'puppeteer';

async function getDetails(url: string) {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'load' });

    const data = await page.evaluate(() => {
        const price = document.querySelector(".room-rental .brightblue.weigh-600");
        const description = document.querySelector(".pglist-p1.pglist-bg.pglist-p-com")?.querySelector('.list-pg-inn-sp')?.querySelector('p');
        const contactDetails = document.querySelector(".list-group-item")

        return {
            price: price?.textContent,
            description: description?.textContent?.trim(),
            name: contactDetails?.querySelector('.name')?.textContent,
            number: contactDetails?.querySelector(".list-group-item .name[style*='font-size: larger; font-weight: bold;padding-right: 10px;']")?.textContent?.trim()
        };

        // return contactDetails?.innerHTML
    })

    await browser.close();

    console.log(data)
};

async function main() {
    await getDetails('https://www.ibilik.my/rooms/8191180/taman-connought-single-room')
};

main();