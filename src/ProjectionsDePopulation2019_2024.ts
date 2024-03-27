import * as fs from "node:fs"
import * as pl from "nodejs-polars"

interface Options {
  log: boolean
  showDataFrame: boolean
}

export class ProjectionsDePopulation2019_2024 {
  remoteFile: string  //= "https://raw.githubusercontent.com/decoderleco/deces_europe/main/data/csv/proj_19np__custom_2224172_linear.csv"
  localRawFile: string  //= "./rawData/proj_19np.csv"
  transformedFile: string  //= "./transformedData/proj_19np_transformed.csv"
  options: Options // = { log: true, showDataFrame: false }

  constructor(remoteFile: string, localRawFile: string, transformedFile: string, options: Options = { log: true, showDataFrame: false }) {
    this.localRawFile = localRawFile
    this.remoteFile = remoteFile
    this.transformedFile = transformedFile
    this.options = options
  }

  async handleDirs() {
    if (fs.existsSync(this.localRawFile.split("/")[1]) == false) {
      if (this.options.log == true) 
        console.log("Create ./"+this.localRawFile.split("/")[1]+" dir")

      fs.mkdirSync( "./"+this.localRawFile.split("/")[1] )
    }
    if (fs.existsSync(this.transformedFile.split("/")[1]) == false) {
      if (this.options.log == true) 
        console.log("Create ./"+this.transformedFile.split("/")[1]+" dir")

      fs.mkdirSync( "./"+this.transformedFile.split("/")[1] )
    }
  }

  run = async() => { 
    await this.handleDirs()
    await this.downLoad()
    await this.transform()
  }

  async downLoad() {
    if (this.options.log == true) 
      console.log("Downloading "+this.remoteFile)
    const res = await fetch(this.remoteFile)
    const text = await res.text()
    try {
      if (this.options.log == true) console.log("Writing "+this.localRawFile)
      fs.writeFileSync( this.localRawFile, text, 
        { 
          encoding: 'utf8',
          flag: 'w',
          mode: 0o666
        }, 
      )
    } catch (err) {
      console.log("error while writing "+this.localRawFile+": ", err)
    }
  }

  async transform() {
    const data: string = fs.readFileSync( this.localRawFile, { encoding: 'utf8' } )
    let df = pl.readCSV( data.replace(/\\/,',').replace(/,/g, '\t'), { sep: "\t" } ) // [c|t]sv to tsv
    
    if (this.options.log == true) 
      console.log("Applying polars tranformations")

    df = df.rename( {"TIME_PERIOD":"time"}) .rename( {"OBS_FLAG":"population_proj"} )
      .select( 'DATAFLOW','LAST UPDATE','time','freq','unit','sex','projection','age','population_proj' )
      .filter(
        (pl.col("projection").str.contains("BSL")) 
        .and(pl.col("sex").str.contains(/M|F/))
      ).withColumn(
        //pl.col("time").str.Datetime().alias("newdate"),
        //pl.col("time").str.strptime(pl.Dtypes[pl.Datetime]).alias("newdate"),
        //pl.col("time").str.replace(pl.col("time"), new Date(pl.col("time"))),
        pl.col('age').str.replace('Y_GE100','Y_OPEN') 
      )

    if (this.options.showDataFrame == true) 
      console.log("Transformed DataFRame:\n", df.sample(10))

    try {
      if (this.options.log == true) 
        console.log("Writing "+this.transformedFile)
      df.writeCSV( this.transformedFile )
    } catch (err) {
      console.log("error: "+err)
    }
  }
}