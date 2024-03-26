import * as fs from "fs"
//import fetch from "node-fetch"
import * as pl from "nodejs-polars"

export class ProjectionsDePopulation2019_2024 {
  remoteFile: string = "https://ec.europa.eu/eurostat/api/dissemination/sdmx/2.1/data/proj_19np?format=TSV"
  localRawFile: string = "./rawData/proj_19np.csv"
  transformedFile: string = "./transformedData/proj_19np_transformed.csv"


  constructor(remoteFile: string, localRawFile: string, transformedFile: string) {
    if (remoteFile) this.localRawFile = remoteFile
    this.localRawFile = localRawFile
    this.remoteFile = remoteFile
    this.transformedFile = transformedFile
  }
  run = async() => { 
    await this.downLoad()
    //await this.transform()
  }

  async downLoad(path?: string) {
    if (!path) path = this.localRawFile
    const res = await fetch(this.remoteFile)
    const text = await res.text()
    const fileStream = fs.createWriteStream(path)
    await new Promise((resolve, reject) => {
      fileStream.write(text)
    });
    this.localRawFile = path
  }

  transform() {
    const data: string = fs.readFileSync(this.localRawFile, { encoding: 'utf8' })
    let df = pl.readCSV(data, { sep: ",", tryParseDates: true }).sample(1000)
    df = df.rename({"TIME_PERIOD":"time"}).rename({"OBS_FLAG":"population_proj"})
    df = df.select('time','DATAFLOW','LAST UPDATE','freq','unit','population_proj','sex','projection','age')
    df = df.filter(
            (pl.col("projection").str.contains("BSL")) 
            .and(pl.col("sex").str.contains(/M|F/))
    ).withColumn(
        //pl.col("time").str.Datetime().alias("newdate"),
        //pl.col("time").str.strptime(pl.Dtypes[pl.Datetime]).alias("newdate"),
        //pl.col("time").str.replace(pl.col("time"), new Date(pl.col("time")))
        pl.col('age').str.replace('Y_GE100','Y_OPEN') 
    )
    console.log(df.head(10))
    df.writeCSV(this.transformedFile)
  }

  config(options: object) {
    if (options) console.log("configuration")
  }
}