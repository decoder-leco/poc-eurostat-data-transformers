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
  static defaultWorkdir: string = `./data_pipeline_workdir/eurostat`
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
    this.format = '/?format='+format
    this.dataWorkDir = dataWorkDir || DecoderLecoEurostatDataIngester.defaultWorkdir
  }

  getIngestedDataFileFolderPath(): string {
    return this.dataWorkDir || DecoderLecoEurostatDataIngester.defaultWorkdir
  }

  async run(): Promise<string[]> {
    return ([
      this.createDir(),
      await this.download()
    ])
  }

  createDir(): string {
    const folderToCreate = `${this.dataWorkDir}`;
    let returnMsg: string = 'pending'
    if (!fs.existsSync(folderToCreate)) {
      try {
        fs.mkdirSync(folderToCreate, { recursive: true } )
        returnMsg = `directory ${folderToCreate} created`
      } catch (error) {
        throw new Error(`Failed to create the [${folderToCreate}] folder.`, { cause: error })
      }
    } else {
      returnMsg = `Skipped creating the [${folderToCreate}] folder, because it already exists.`
    }
    return returnMsg
  }

  getIngestedDataFileName(): string {
    return this.filePathInEurostat+".csv"
  }


  async download(): Promise<string> {
    // console.log("download: ", DecoderLecoEurostatDataIngester.baseUrl + '/' + this.filePathInEurostat + this.format)
    const res = await fetch( `${DecoderLecoEurostatDataIngester.baseUrl}/${this.filePathInEurostat}${this.format}` )
    let returnMsg: string ='pending'
    if (!res.ok) {
      //console.log((`error while fetching ${DecoderLecoEurostatDataIngester.baseUrl + this.filePathInEurostat + this.format}`))
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
      returnMsg = `File ${this.dataWorkDir}/${this.filePathInEurostat}.csv has succesfully been writed`
    } catch (err) {
        returnMsg = "error while writing " + this.filePathInEurostat + ": ", err
      throw new Error(`Failed to write File ${this.filePathInEurostat} to ${this.dataWorkDir}/${this.filePathInEurostat}.csv`, {
        cause: err
      })
    }
    return returnMsg
  }
}