import puppeteer from 'puppeteer';

async function main() {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto('https://www.ibilik.my/rooms/kuala_lumpur?location_search=2&location_search_name=Kuala%20Lumpur%2C%20Malaysia', { waitUntil: 'load' });
    // await page.screenshot({path: 'ibilikcom.png'});

     

    const data = await page.evaluate(() => {

        const doc = []

        const titles = document.querySelectorAll(".home-list-pop-desc.inn-list-pop-desc a h3")
        // const titlesArray = Array.from(titles).map((title) => title.textContent);
        const links = document.querySelectorAll(".home-list-pop-desc.inn-list-pop-desc a")
        // const linksArray = Array.from(links).map((links) => links.getAttribute('href'));
        const roomDetails = document.querySelectorAll('.room-details p');
        // const a = roomDetails.querySelector('.fas.fa-map-marker-alt')
        const detailsArray = Array.from(roomDetails).map((roomDetail) => roomDetail.textContent)

        // Array.from(document.querySelectorAll('.fas.fa-map-marker-alt'), element => element.nextSibling.textContent.trim())

        return detailsArray


        // return Array.from(anchors, (anchor) => {
        //     const h3 = anchor.querySelector('h3');
        //     return {
        //         title: h3? h3.innerHTML : '',
        //         link: anchor.getAttribute('href')
        //     };
        // });

        // return Array.from({ length: titles.length }, (_, i) => ({
        //     title: titles[i].innerHTML,
        //     link: links[i].getAttribute('href')
        // }));
        // const locationsArray = Array.from(locations).map((locations) => locations.textContent);
        // return locations?.innerHTML
    });

    await browser.close();

    console.log(data)
};

main();