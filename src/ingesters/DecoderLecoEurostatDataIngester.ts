import * as fs from "node:fs"
import axios from 'redaxios';
// import fs from 'fs/promises';
export enum EurostatDatasetFormat {
  SDMX_CSV = "SDMX-CSV",
  TSV = "TSV"
}
/**
 * Ingestion des données csv provenant du repsitory Github https://github.com/decoderleco/deces_europe
 * 
 * - Download the CSV dataset file,
 * - Sends the CSV dataset file to kafka (publish to kafka topic)
 * - Persists the CSV dataset file to an S3 bucket (using the local filesystem in much too uncomfortable, using an S3 bucket so much better)
 * - the S3 bucket (containing the CSV dataset file) is added on a git branch in LakeFS
 * 
 **/
export class DecoderLecoEurostatDataIngester {
  static baseUrl: string = "https://ec.europa.eu/eurostat/api/dissemination/sdmx/2.1/data"
  
  /**
   * @param dataset_name 
   * @param desiredFormat 
   * @param dataWorkDir 
   */
  constructor(protected dataset_name: string, protected desiredFormat?: EurostatDatasetFormat, protected dataWorkDir?: string) {
    this.dataset_name = dataset_name;
    if (!desiredFormat) {
      this.desiredFormat = EurostatDatasetFormat.SDMX_CSV;
    } else {
      this.desiredFormat = desiredFormat;
    }
    
    this.dataWorkDir = dataWorkDir || `./data_pipeline_workdir`
  }
  async run() {
    await this.createDir()
    await this.download()
  }

  getIngestedDataFileFolderPath(): string {
    let folderPath: string = ``;
    folderPath = `${this.dataWorkDir}/${this.dataset_name}`
    return folderPath;
  }
  getIngestedDataFilePath(): string {
    let filePath = ``;
    switch (this.desiredFormat) {
      case EurostatDatasetFormat.SDMX_CSV:
        filePath = `${this.getIngestedDataFileFolderPath()}/${this.dataset_name}.sdmx.csv`
        break;
      case EurostatDatasetFormat.TSV:
        filePath = `${this.getIngestedDataFileFolderPath()}/${this.dataset_name}.tsv`
        break;
      default:
        break;
    }
    return filePath;
  }
  public getDatasetName(): string {
    return this.dataset_name
  }
  public getFormat(): EurostatDatasetFormat {
    return this.desiredFormat || EurostatDatasetFormat.SDMX_CSV
  }
  public getDatasetDownloadUrl(): string {
    const datasetDownloadUrl = `${DecoderLecoEurostatDataIngester.baseUrl}/${this.dataset_name}/?format=${this.desiredFormat}`;
    return datasetDownloadUrl;
  }
  public createDir(): void {
    let folderToCreate = `${this.getIngestedDataFileFolderPath()}`;
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
    let splittedFilePath = this.desiredFormat.split("/");
    let filename: string = splittedFilePath[splittedFilePath.length - 1]
    return filename;
  }
  */

  async download() {
    // console.log("download: ", DecoderLecoEurostatDataIngester.baseUrl + this.dataset_name + this.desiredFormat)
    const datasetDownloadUrl = `${DecoderLecoEurostatDataIngester.baseUrl}/${this.dataset_name}/?format=${this.desiredFormat}`

    let fileData = null;
    let response = null;
    try {
      // const downloadLink = 'https://example.com/test.pdf'
      response = await axios.get(datasetDownloadUrl, { 
        // responseType: 'arraybuffer'
        responseType: "arrayBuffer"
      });
      fileData = Buffer.from(response.data, 'binary');
      // await fs.writeFile('./file.pdf', fileData);
      // console.log('PDF file saved!');
      if (response.status != 200 && response.status != 201) {
        // console.log((`error while fetching ${DecoderLecoEurostatDataIngester.baseUrl + this.dataset_name + this.desiredFormat}`))
        throw new Error(`HTTP - ${response.statusText} - ${response.status} - An Error occured while fetching [${datasetDownloadUrl}]`)
      }
    } catch (err) {
        console.error(err);
        throw new Error(`An Error occured while fetching [${this.dataset_name}] Eurostat Dataset dataset [${datasetDownloadUrl}]`, {
          cause: err
        })
    }
    
    const filePath = this.getIngestedDataFilePath();

    try {

      fs.writeFileSync(filePath, fileData.toString(), 
        { 
          encoding: 'utf8',
          flag: 'w',
          mode: 0o666
        }, 
      )
      console.log(`[${this.dataset_name}] dataset has succesfully been downloaded from eurostat [${datasetDownloadUrl}], and persisted to File [${filePath}]`)
    } catch (err) {
      // console.log("error while writing " + this.desiredFormat + ": ", err)
      throw new Error(`Failed to persist [${this.dataset_name}] Eurostat dataset to [${filePath}]`, {
        cause: err
      })
    }
  }
}