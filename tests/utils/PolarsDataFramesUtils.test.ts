import pl from 'nodejs-polars'
/*
export class PolarsDataFramesUtilsPolarsDataFramesUtils {
    constructor() {
        
    }
    public static async totalSum(columunName: string, df: pl.DataFrame): Promise<number> {
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
 * Expected total sum : 17
 * ??? La somme des n premiers nombres premiers donne une suite dont les éléments sont alternativment premiers ???...
 */
const testShoeOwnersCSV1 = `ID,Name,Birthday,NumberOfOwnedShoePairs\n
1,Jean,20BC-07-12,2\n
2,Mathieu,25BC-09-20,3\n
3,Marc,31BC-03-08,5\n
3,Luc,18BC-07-11,7\n`

/**
 * Expected total sum : 10
 */
const testShoeOwnersCSV2 = `ID,Name,Birthday,NumberOfOwnedShoePairs\n
1,Jean,20BC-07-12,1\n
2,Mathieu,25BC-09-20,2\n
3,Marc,31BC-03-08,3\n
3,Luc,18BC-07-11,4\n`

/**
 * Expected total sum : 170
 */
const testShoeOwnersCSV3 = `ID,Name,Birthday,NumberOfOwnedShoePairs\n
1,Jean,20BC-07-12,20\n
2,Mathieu,25BC-09-20,30\n
3,Marc,31BC-03-08,50\n
3,Luc,18BC-07-11,70\n`

/**
 * Expected total sum : 170
 */
const testShoeOwnersCSV4 = `ID,Name,NumberOfOwnedShoePairs\n
1,Jean,20\n
2,Mathieu,30\n
3,Marc,50\n
3,Luc,70\n`

/**
 * Expected total sum : 0
 */
const testShoeOwnersCSV5 = `ID,Name,Birthday,NumberOfOwnedShoePairs\n
1,Jean,20BC-07-12,0\n
2,Mathieu,25BC-09-20,0\n
3,Marc,31BC-03-08,0\n
3,Luc,18BC-07-11,0\n`

/**
 * Expected total sum : 4
 */
const testShoeOwnersCSV6 = `ID,Name,Birthday,NumberOfOwnedShoePairs\n
1,Jean,20BC-07-12,1\n
2,Mathieu,25BC-09-20,1\n
3,Marc,31BC-03-08,1\n
3,Luc,18BC-07-11,1\n`

/**
 * Expected total sum : 4
 */
const testShoeOwnersCSV7 = `ID,NumberOfOwnedShoePairs\n
0,1\n
1,1\n
2,1\n
3,1\n`

/**
 * expected totalSum: 17
 */
const testDF1 = pl.readCSV(testShoeOwnersCSV1, { sep: "," } )
/**
 * expected totalSum: 10
 */
const testDF2 = pl.readCSV(testShoeOwnersCSV2, { sep: "," } )
/**
 * expected totalSum: 170
 */
const testDF3 = pl.readCSV(testShoeOwnersCSV3, { sep: "," } )
/**
 * expected totalSum: 170
 */
const testDF4 = pl.readCSV(testShoeOwnersCSV4, { sep: "," } )
/**
 * expected totalSum: 0
 */
const testDF5 = pl.readCSV(testShoeOwnersCSV5, { sep: "," } )
/**
 * expected totalSum: 4
 */
const testDF6 = pl.readCSV(testShoeOwnersCSV6, { sep: "," } )
/**
 * expected totalSum: 4
 */
const testDF7 = pl.readCSV(testShoeOwnersCSV7, { sep: "," } )



describe('Testing - PolarsDataFramesUtilsPolarsDataFramesUtils', () => {
  afterAll(()=>{
    //jest.restoreAllMocks();
    // nothing to do
  })

  describe('Test the totalSum() static method', () => {
    it('shall return a total number of [17] shoe pairs, for the testDF1 dataframe', async () => {
      const numberOfOwnedShoePairsResult = await utils.PolarsDataFramesUtilsPolarsDataFramesUtils.totalSum(`NumberOfOwnedShoePairs`,testDF1)
      expect(numberOfOwnedShoePairsResult).toEqual(17)
    })
    it('shall return a total number of [10] shoe pairs, for the testDF2 dataframe', async () => {
      const numberOfOwnedShoePairsResult = await utils.PolarsDataFramesUtilsPolarsDataFramesUtils.totalSum(`NumberOfOwnedShoePairs`,testDF2)
      expect(numberOfOwnedShoePairsResult).toEqual(10)
    })
    it('shall return a total number of [170] shoe pairs, for the testDF3 dataframe', async () => {
      const numberOfOwnedShoePairsResult = await utils.PolarsDataFramesUtilsPolarsDataFramesUtils.totalSum(`NumberOfOwnedShoePairs`,testDF3)
      expect(numberOfOwnedShoePairsResult).toEqual(170)
    })
    it('shall return a total number of [170] shoe pairs, for the testDF4 dataframe', async () => {
      const numberOfOwnedShoePairsResult = await utils.PolarsDataFramesUtilsPolarsDataFramesUtils.totalSum(`NumberOfOwnedShoePairs`,testDF4)
      expect(numberOfOwnedShoePairsResult).toEqual(170)
    })
    it('shall return a total number of [0] shoe pairs, for the testDF5 dataframe', async () => {
      const numberOfOwnedShoePairsResult = await utils.PolarsDataFramesUtilsPolarsDataFramesUtils.totalSum(`NumberOfOwnedShoePairs`,testDF5)
      expect(numberOfOwnedShoePairsResult).toEqual(0)
    })
    it('shall return a total number of [4] shoe pairs, for the testDF6 dataframe', async () => {
      const numberOfOwnedShoePairsResult = await utils.PolarsDataFramesUtilsPolarsDataFramesUtils.totalSum(`NumberOfOwnedShoePairs`,testDF6)
      expect(numberOfOwnedShoePairsResult).toEqual(4)
    })
    it('shall return a total number of [4] shoe pairs, for the testDF7 dataframe', async () => {
      const numberOfOwnedShoePairsResult = await utils.PolarsDataFramesUtilsPolarsDataFramesUtils.totalSum(`NumberOfOwnedShoePairs`,testDF7)
      expect(numberOfOwnedShoePairsResult).toEqual(4)
    })
  })
})