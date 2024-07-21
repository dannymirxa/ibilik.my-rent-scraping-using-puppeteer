import puppeteer from 'puppeteer';

async function main() {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto('https://www.ibilik.my/rooms/kuala_lumpur?location_search=2&location_search_name=Kuala%20Lumpur%2C%20Malaysia', { waitUntil: 'load' });
    // await page.screenshot({path: 'ibilikcom.png'});

     

    const data = await page.evaluate(() => {

        const doc = []

        const parent = document.querySelector(".home-list-pop-desc.inn-list-pop-desc");

        const parents = document.querySelectorAll(".home-list-pop-desc.inn-list-pop-desc");

        for (let i = 0; i < parents.length; i++) {
            const details = parents[i]?.querySelector(".room-details")
            doc.push({
                // get title from the <h3> tag text
                title: parents[i]?.querySelector('h3')?.innerText,

                //get href attribute from <a> tag
                link: parents[i]?.querySelector('a')?.getAttribute('href'),

                // <div class="room-details">
                //     <p>
                //         <i class="fas fa-map-marker-alt"></i> 
                //         Desa ParkCity, Kepong
                //     </p>
                //                         <p>
                //         <i class="fas fa-users"></i> 
                //         Prefer move-in immediately, &lt; 6 month, 6 month, 12 month and above, Student, Employed, Unemployed, Malay, Chinese, Indian, Other, Prefer Zero Deposit 
                //     </p>

                //                         <p>
                //         <i class="fas fa-bed"></i>
                //         Single Room
                //     </p>
                //                         <p>
                //         <i class="far fa-plus-square"></i>
                //         Air-Conditioning, Washing Machine, Wifi / Internet Access, Cooking Allowed, TV, Share Bathroom, Private Bathroom, Near KTM / LRT, Near LRT / MRT, Near KTM, Near LRT, Near MRT, Near Bus stop, 24 hours security, Mini Market
                //     </p>

                // get localtion from <p> tag containing the <i> element with the specified classes
                // after get the <p> tag get the text from the parent element
                location: details?.querySelector("p > i.fas.fa-map-marker-alt")?.parentElement?.textContent?.trim(),
                preferences: details?.querySelector("p > i.fas.fa-users")?.parentElement?.textContent?.trim(),
                bed: details?.querySelector("p > i.fas.fa-bed")?.parentElement?.textContent?.trim(),
                accommodations: details?.querySelector("p > i.fa-plus-square")?.parentElement?.textContent?.trim(),
            });
        };

        return doc
    });

    await browser.close();

    console.log(data)
};

main();