import pl from 'nodejs-polars'
/**
 * A Utility Class with static methods that
 * are very useful when working with [Polars](https://github.com/pola-rs/nodejs-polars) dataframes
 * [Polars](https://github.com/pola-rs/nodejs-polars) Rocks!
 */
export class PolarsDataFramesUtils {
    /**
     * Compute the sum of all values in a column of a `polars` dataframe
     * @param columunName The name of the column for which you want to compute the total sum of all values
     * @param providedDf The dataframe for which you want to compute the sum of all values in the <code>columunName</code> column.
     * @returns 
     */
    public static async totalSum(columunName: string, providedDf: pl.DataFrame): Promise<number> {
        /**
         * I get the number of rows of my dataframe
         **/
        const numberOfRows = providedDf.rows().length

        /**
         * I build a Polars Serie which has exactly the
         * length of the number of rows of my dataframe
         **/
        const arrayForBuildingOneNewColumn = []
        const columnSingleValue = `I use This Column To group by all rows regardless of row values in other columns`
        for (let i = 0; i < numberOfRows; i++) {
            arrayForBuildingOneNewColumn.push(`${columnSingleValue}`)
        }

        /**
         * And I add the new column on the left of my dataframe, using the sooo powerful [hstack] polars dataframe method!
         **/

        const theNewColumnIwillUseToGroupAllRows = pl.Series("Used to sum all rows of a given column", arrayForBuildingOneNewColumn)
        // console.log(`PolarsDataFramesUtils.totalSum(columunName: string, providedDf: pl.DataFrame): Promise<number> ----------->> providedDf.columns is: `, providedDf.columns)
        // console.log(`PolarsDataFramesUtils.totalSum(columunName: string, providedDf: pl.DataFrame): Promise<number> ----------->> providedDf.rows() is: `, providedDf.rows())
        
        const dfWithNewColumn = providedDf.hstack([theNewColumnIwillUseToGroupAllRows]/*, false*/).select(
            pl.col("Used to sum all rows of a given column"),
            pl.col("*").exclude("Used to sum all rows of a given column") // all of the columns, except the one I added and titled "A Kind Of Magic"
        )
        // console.log(`PolarsDataFramesUtils.totalSum(columunName: string, providedDf: pl.DataFrame): Promise<number> ----------->> dfWithNewColumn.columns is: `, dfWithNewColumn.columns)
        // console.log(`PolarsDataFramesUtils.totalSum(columunName: string, providedDf: pl.DataFrame): Promise<number> ----------->> dfWithNewColumn.rows() is: `, dfWithNewColumn.rows())
        
        const dfWithTotalSum = dfWithNewColumn.groupBy("Used to sum all rows of a given column").agg(
            pl.col("*").exclude(`${columunName}`).first(),
            pl.col(`${columunName}`).sum().alias(`totalSumYouWant`)
        ).select(
            // pl.col("*").exclude("Used to sum all rows of a given column")
            pl.col(`totalSumYouWant`)
        )
        // console.log(`PolarsDataFramesUtils.totalSum(columunName: string, providedDf: pl.DataFrame): Promise<number> ----------->> dfWithTotalSum.columns is: `, dfWithTotalSum.columns)
        // console.log(`PolarsDataFramesUtils.totalSum(columunName: string, providedDf: pl.DataFrame): Promise<number> ----------->> dfWithTotalSum.rows() is: `, dfWithTotalSum.rows())
        return dfWithTotalSum.rows()[0][0]
    }
}