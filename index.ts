import puppeteer from 'puppeteer';
import { getDetails } from './getDetails.ts'
import { flattenJson } from './flattenJSON.ts';
import * as fs from 'fs';

// console.log(await getDetails('https://www.ibilik.my/rooms/8191180/taman-connought-single-room'))

async function getFrontDetails(url: string) {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'load' });
    await page.exposeFunction('getDetails', getDetails)

    // console.log(url)

    const data = await page.evaluate(async () => {

        const doc = []
        // const parent = document.querySelector(".home-list-pop-desc.inn-list-pop-desc");

        const parents = Array.from(document.querySelectorAll(".home-list-pop-desc.inn-list-pop-desc"));

        // for (let i = 0; i < parents.length; i++) {
        for (let i in parents) {

            const details = parents[i]?.querySelector(".room-details")

            const linkUrl = parents[i]?.querySelector('a')?.getAttribute('href')?.toString()!;

            let detail: { price: string | null | undefined; description: string | null | undefined; name: string | null | undefined; number: string | null | undefined; } | null = null;
            
            // try {
            //     detail = await getDetails(linkUrl)
            // } catch (error) {
            //     // handle error
            //     detail = null
            // }
            // 

            detail = await getDetails(linkUrl)

            doc.push({
                // get title from the <h3> tag text
                title: parents[i]?.querySelector('h3')?.innerText,

                //get href attribute from <a> tag
                link: linkUrl,

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
                details: detail
            });
        };

        return doc
    });

    await browser.close();

    return data
      
}

async function flattenData(link: string) {
    const data = await getFrontDetails(link)
    const flattenData: any = data.map(i => flattenJson(i))
    return flattenData
}

async function main() {
    // const data = await getFrontDetails('https://www.ibilik.my/rooms/kuala_lumpur?location_search=2&location_search_name=Kuala%20Lumpur%2C%20Malaysia')
    // data.forEach(i => {
    //     console.log(flattenJson(i))
    // })
    const data = await flattenData('https://www.ibilik.my/rooms/kuala_lumpur?location_search=2&location_search_name=Kuala%20Lumpur%2C%20Malaysia')
    fs.writeFileSync('./houseData.json', JSON.stringify(data))
};

main();