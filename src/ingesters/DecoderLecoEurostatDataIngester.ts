import * as fs from "node:fs"
/**
 * Ingestion des données csv provenant d'Eurostat https://ec.europa.eu/eurostat/api/dissemination/sdmx/2.1/data/
 * 
 * - Download the CSV dataset file,
 * - Sends the CSV dataset file to kafka (publish to kafka topic)
 * - Persists the CSV dataset file to an S3 bucket (using the local filesystem in much too uncomfortable, using an S3 bucket so much better)
 * - the S3 bucket (containing the CSV dataset file) is added on a git branch in LakeFS
 * 
 **/
export class DecoderLecoEurostatDataIngester {
  static baseUrl: string = "https://ec.europa.eu/eurostat/api/dissemination/sdmx/2.1/data"
  // static format: String = "/?format=SDMX-CSV"
  
  /**
   * 
   * @param filePathInEurostat 
   * @param dataWorkDir 
   */
  constructor(protected filePathInEurostat: string, protected format: string, protected dataWorkDir?: string) {
    if (filePathInEurostat == "") {
      throw new Error(`[DecoderLecoEurostatDataIngester] - [filePathInEurostat] second argument of constructor must not be an ampty string`);
    }
    this.filePathInEurostat = filePathInEurostat;
    this.format = format
    this.dataWorkDir = dataWorkDir || `./data_pipeline_workdir/eurostat`
  }

  getIngestedDataFileFolderPath(): string {
    let folderPath: string = ``;
    folderPath = this.filePathInEurostat.split("/").slice(0,-1).join("/")
    //console.log(`folderPath: ${folderPath}`)
    return folderPath;
  }

  async run() {
    await this.createDir()
    await this.download()
  }

  public createDir(): void {
    const folderToCreate = `${this.dataWorkDir}`;
    if (!fs.existsSync(folderToCreate)) {
      try {
        fs.mkdirSync(folderToCreate, { recursive: true } )
        console.log(`directory ${folderToCreate} created`)
      } catch (error) {
        throw new Error(`Failed to create the [${folderToCreate}] folder.`, { cause: error })
      }
    } else {
      console.info(`Skipped creating the [${folderToCreate}] folder, because it already exists.`)
    }
  }
  /*
  getIngestedDataFileName(): string {
    let splittedFilePath = this.filePathInEurostat.split("/");
    let filename: string = splittedFilePath[splittedFilePath.length - 1]
    return filename;
  }
  */

  async download(): Promise<string> {
    console.log("download: ", DecoderLecoEurostatDataIngester.baseUrl + '/' + this.filePathInEurostat + this.format)
    const res = await fetch( `${DecoderLecoEurostatDataIngester.baseUrl}/${this.filePathInEurostat}${this.format}` )
    let returnMsg: string ='pending'
    if (!res.ok) {
      console.log((`error while fetching ${DecoderLecoEurostatDataIngester.baseUrl + this.filePathInEurostat + this.format}`))
      returnMsg = `HTTP - ${res.statusText} - ${res.status} - An Error occured while fetching [${DecoderLecoEurostatDataIngester.baseUrl}/${this.filePathInEurostat+this.format}]`
    }
    const text = await res.text()
    //console.log(text)
    try {
      fs.writeFileSync( `${this.dataWorkDir}/${this.filePathInEurostat}.csv`, text, 
        { 
          encoding: 'utf8',
          flag: 'w',
          mode: 0o666
        }, 
      )
      returnMsg = `File ${this.filePathInEurostat} has succesfully been writed to ${this.dataWorkDir}/${this.filePathInEurostat}.csv`
    } catch (err) {
        returnMsg = "error while writing " + this.filePathInEurostat + ": ", err
      throw new Error(`Failed to write File ${this.filePathInEurostat} to ${this.dataWorkDir}/${this.filePathInEurostat}.csv`, {
        cause: err
      })
    }
    return returnMsg
  }
}