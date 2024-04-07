import pl from 'nodejs-polars'
/*
export class SdmxToCsvConverter {
    public static async convert(sdmxData: string): string {
        return sdmxData.replace(/\\/,'\n').replace(/\t/g, ',')
    }
}
*/

import * as utils from "../../src/utils"

/*
const video = require('./video');

test('plays video', () => {
  const spy = jest.spyOn(video, 'play');
  const isPlaying = video.play();

  expect(spy).toHaveBeenCalled();
  expect(isPlaying).toBe(true);

  spy.mockReset();
  spy.mockRestore();
});
*/

/**
 * Between the last header and the backslash: a tab character
 */
const testShoeOwnersSdmxCSV1 = `ID\tName\tBirthday\tNumberOfOwnedShoePairs\t\\
1,Jean,20BC-07-12,2
2,Mathieu,25BC-09-20,3
3,Marc,31BC-03-08,5
3,Luc,18BC-07-11,7`
const expectedTestShoeOwnersCSV1 = `ID,Name,Birthday,NumberOfOwnedShoePairs
1,Jean,20BC-07-12,2
2,Mathieu,25BC-09-20,3
3,Marc,31BC-03-08,5
3,Luc,18BC-07-11,7`
/**
 * Between the last header and the backslash: a space character
 */
const testShoeOwnersSdmxCSV2 = `ID\tName\tBirthday\tNumberOfOwnedShoePairs \\
1,Jean,20BC-07-12,1
2,Mathieu,25BC-09-20,2
3,Marc,31BC-03-08,3
3,Luc,18BC-07-11,4`
const expectedTestShoeOwnersCSV2 = `ID,Name,Birthday,NumberOfOwnedShoePairs 
1,Jean,20BC-07-12,1
2,Mathieu,25BC-09-20,2
3,Marc,31BC-03-08,3
3,Luc,18BC-07-11,4`

/**
 * Between the last header and the backslash: no character at all
 */
const testShoeOwnersSdmxCSV3 = `ID\tName\tBirthday\tNumberOfOwnedShoePairs\\
1,Jean,20BC-07-12,20
2,Mathieu,25BC-09-20,30
3,Marc,31BC-03-08,50
3,Luc,18BC-07-11,70`
const expectedTestShoeOwnersCSV3 = `ID,Name,Birthday,NumberOfOwnedShoePairs
1,Jean,20BC-07-12,20
2,Mathieu,25BC-09-20,30
3,Marc,31BC-03-08,50
3,Luc,18BC-07-11,70`

/**
 * Expected total sum : 4
 */
const testShoeOwnersSdmxCSV4 = `ID\tNumberOfOwnedShoePairs\\
0,1
1,1
2,1
3,1`
const expectedTestShoeOwnersCSV4 = `ID,NumberOfOwnedShoePairs
0,1
1,1
2,1
3,1`




describe('Testing - SdmxToCsvConverter', () => {
  afterAll(()=>{
    //jest.restoreAllMocks();
    // nothing to do
  })

  describe('Test the convert() static method properly converts SMDX-CSV data tp CSV data', () => {
    it(`shall return a resulting converted CSV equal to [${expectedTestShoeOwnersCSV1}], when provided the [${testShoeOwnersSdmxCSV1}] SDMX-CSV data`, async () => {
        const resultOfConversion = await utils.SdmxToCsvConverter.convert(testShoeOwnersSdmxCSV1);
        console.log(` >>>>>>> testShoeOwnersSdmxCSV1 : [${testShoeOwnersSdmxCSV1}]`);
        console.log(` >>>>>>> resultOfConversion (length [${resultOfConversion.length}]) : [${resultOfConversion}]`);
        console.log(` >>>>>>> expectedTestShoeOwnersCSV1 (length [${expectedTestShoeOwnersCSV1.length}]) : [${expectedTestShoeOwnersCSV1}]`);
        for (let i = 0; i < Math.min(resultOfConversion.length,expectedTestShoeOwnersCSV1.length); i++) {
            console.log(` <<+>> resultOfConversion[${i}]=[${resultOfConversion[i]}] // expectedTestShoeOwnersCSV1[${i}]=[${expectedTestShoeOwnersCSV1[i]}]`)
        }
        expect(resultOfConversion  === expectedTestShoeOwnersCSV1).toBe(true);
    })
    it(`shall return a resulting converted CSV equal to [${expectedTestShoeOwnersCSV2}], when provided the [${testShoeOwnersSdmxCSV2}] SDMX-CSV data`, async () => {
        const resultOfConversion = await utils.SdmxToCsvConverter.convert(testShoeOwnersSdmxCSV2)
        console.log(` >>>>>>> testShoeOwnersSdmxCSV2 : [${testShoeOwnersSdmxCSV2}]`);
        console.log(` >>>>>>> resultOfConversion : [${resultOfConversion}]`);
        console.log(` >>>>>>> expectedTestShoeOwnersCSV2 : [${expectedTestShoeOwnersCSV2}]`);
        expect(resultOfConversion  === expectedTestShoeOwnersCSV2).toBe(true)
    })
    it(`shall return a resulting converted CSV equal to [${expectedTestShoeOwnersCSV3}], when provided the [${testShoeOwnersSdmxCSV3}] SDMX-CSV data`, async () => {
        const resultOfConversion = await utils.SdmxToCsvConverter.convert(testShoeOwnersSdmxCSV3)
        console.log(` >>>>>>> testShoeOwnersSdmxCSV3 : [${testShoeOwnersSdmxCSV3}]`);
        console.log(` >>>>>>> resultOfConversion : [${resultOfConversion}]`);
        expect(resultOfConversion  === expectedTestShoeOwnersCSV3).toBe(true)
    })
    it(`shall return a resulting converted CSV equal to [${expectedTestShoeOwnersCSV4}], when provided the [${testShoeOwnersSdmxCSV4}] SDMX-CSV data`, async () => {
        const resultOfConversion = await utils.SdmxToCsvConverter.convert(testShoeOwnersSdmxCSV4)
        console.log(` >>>>>>> testShoeOwnersSdmxCSV4 : [${testShoeOwnersSdmxCSV4}]`);
        console.log(` >>>>>>> resultOfConversion : [${resultOfConversion}]`);
        console.log(` >>>>>>> expectedTestShoeOwnersCSV4 : [${expectedTestShoeOwnersCSV4}]`);
        expect(resultOfConversion  === expectedTestShoeOwnersCSV4).toBe(true)
    })
  })
})