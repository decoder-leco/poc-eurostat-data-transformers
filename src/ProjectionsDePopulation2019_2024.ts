import * as fs from "fs"
//import fetch from "node-fetch"
import * as pl from "nodejs-polars"

export class ProjectionsDePopulation2019_2024 {
  remoteFile: string = "https://ec.europa.eu/eurostat/api/dissemination/sdmx/2.1/data/proj_19np?format=TSV"
  localRawFile: string = "./rawData/proj_19np.csv"
  transformedFile: string = "./transformedData/proj_19np_transformed.csv"


  constructor(remoteFile?: string) {
    if (remoteFile) this.localRawFile = remoteFile
  }

  async downLoad(path?: string) {
    if (!path) path = this.localRawFile
    const res = await fetch(this.remoteFile)
    const fileStream = fs.createWriteStream(path)
    await new Promise((resolve, reject) => {
      //res.body?.pipe(fileStream)
      //res.body?.on("error", reject)
      //fileStream.write(res.body)
      //fileStream.on("finish", resolve)
      console.log(res.body)
    });
    this.localRawFile = path
  }

  transform(destFile?: string) {
    if (!destFile) destFile = this.transformedFile
    const data: string = fs.readFileSync('./data/proj_19np.tsv', { encoding: 'utf8' })
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
    df.writeCSV(destFile)
  }

  config(options: object) {
    if (options) console.log("configuration")
  }
}