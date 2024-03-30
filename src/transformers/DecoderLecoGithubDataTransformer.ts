import * as fs from "node:fs"
import * as pl from "nodejs-polars"

/**
 * Transformation du DATASET depuis le repetoire des raw dataset
 * & copie de la transformation dans un repertoire locale
 */
export class DecoderLecoGithubDataTransformer {
  
  /**
   * @param sourceDataFilePath The path to the file containing the data to transform "the source data". E.g. './rawData/proj_19np.csv', the path must begin with './'.
   * @param transformedDataFilePath The path to the file in which the transformed data will be persisted. E.g. [./transformedData/proj_19np_transformed.csv], the path must begin with './'.
   */
  constructor(protected sourceDataFilePath: string, protected transformedDataFilePath: string) {
    this.sourceDataFilePath = sourceDataFilePath
    this.transformedDataFilePath = transformedDataFilePath
  }

  private getTransformedDataFileFolderPath(): string {
    let folderPath: string = ``;
    folderPath = this.transformedDataFilePath.split("/").slice(0,-1).join("/")
    return folderPath;
  }

  /**
   * Runs the data transformation.
   */
  async run() {
    await this.createDir()
    await this.transform()
  }

  /**
   * Creates, if itdoes not exists, the 
   * folder containing the file in which 
   * the transformed data will be persisted.
   */
  public async createDir() {
    let folderToCreate = this.getTransformedDataFileFolderPath();
    fs.mkdirSync(folderToCreate, {
      recursive: true
    })
  }

  /**
   * Transforms the data, and persists the transformed data to a file.
   */
  private async transform() {
    const data: string = fs.readFileSync(this.sourceDataFilePath, { encoding: 'utf8' })
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
      df.writeCSV(this.transformedDataFilePath)
    } catch (err) {
      /**
       * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/cause#rethrowing_an_error_with_a_cause
       */
      throw new Error(`Writing transformed data to the [${this.transformedDataFilePath}] failed.`, { cause: err });
    }
  }

}