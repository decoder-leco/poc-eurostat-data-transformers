import * as fs from "node:fs"
import * as pl from "nodejs-polars"
import { handleDirs } from "./handleDir"

/**
 * Transformation du DATASET depuis le repetoire des raw dataset
 * & copie de la transformation dans un repertoire locale
 */
export class Transform {
  
  /**
   *  TRANSFORMATION DU DATASET DANS UN NOUVEAU FICHIER
   * 
   * @param rawPath         local path [ex: ./rawData/proj_19np.csv   DO NOT FORGET ./ ATM]
   * @param transformPath   local path [ex: ./transformedData/proj_19np_transformed.csv   DO NOT FORGET ./ ATM]
   */
  constructor(protected rawPath: string, protected transformPath: string) {
    this.rawPath = rawPath
    this.transformPath = transformPath
  }

  async run() {
    await handleDirs(this.transformPath)
    await this.transform()
  }

  async transform() {
    const data: string = fs.readFileSync( this.rawPath, { encoding: 'utf8' } )
    let df = pl.readCSV( data.replace(/\\/,',').replace(/,/g, '\t'), { sep: "\t" } ) // [c|t]sv to tsv

    df = df.rename( {"TIME_PERIOD":"time"}) .rename( {"OBS_FLAG":"population_proj"} )
      .select( 'DATAFLOW','LAST UPDATE','time','freq','unit','sex','projection','age','population_proj' )
      .filter(
        (pl.col("projection").str.contains("BSL")) 
        .and(pl.col("sex").str.contains(/M|F/))
      ).withColumn(
        //pl.col("time").str.strptime(pl.Dtypes[pl.Datetime]).alias("newdate"),
        pl.col('age').str.replace('Y_GE100','Y_OPEN') 
      )

    try {
      df.writeCSV( this.transformPath )
      return('file writed')
    } catch (err) {
      return("error: " + err)
    }
  }

}