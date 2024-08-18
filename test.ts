import { getDetails } from './getDetails.ts'

console.log(await getDetails('https://www.ibilik.my/rooms/8191180/taman-connought-single-room'))

let x = [1,2,3,4,5]

for (let i in x) {
    console.log(i)
}

for (let i = 0; i < x.length; i++) {
    console.log(i)
}