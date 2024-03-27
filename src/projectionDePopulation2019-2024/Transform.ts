import * as fs from "node:fs"
import * as pl from "nodejs-polars"

export class Transform {
  static baseRawUrl: string = ""

  constructor(protected rawPath: string, protected transformPath: string) {
    this.rawPath = rawPath
    this.transformPath = transformPath
  }

  async run() {
    await this.handleDirs()
    await this.transform()
  }

  async handleDirs() {
    if (
          fs.existsSync(this.transformPath.split("/")[
              this.transformPath.substring(0,2) == "./" ? 1 : 0
            ]) == false)   
      fs.mkdirSync( "./"+this.transformPath.split("/")[ 
          this.transformPath.substring(0,2) == "./" ? 1 : 0 
      ])
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
    } catch (err) {
      console.log("error: "+ err)
    }
  }

}