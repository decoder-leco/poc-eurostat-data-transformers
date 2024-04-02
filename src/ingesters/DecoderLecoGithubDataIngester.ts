import * as fs from "node:fs"
/**
 * Ingestion des données csv provenant du repsitory Github https://github.com/decoderleco/deces_europe
 * 
 * - Download the CSV dataset file,
 * - Sends the CSV dataset file to kafka (publish to kafka topic)
 * - Persists the CSV dataset file to an S3 bucket (using the local filesystem in much too uncomfortable, using an S3 bucket so much better)
 * - the S3 bucket (containing the CSV dataset file) is added on a git branch in LakeFS
 * 
 **/
export class DecoderLecoGithubDataIngester {
  static baseUrl: string = "https://raw.githubusercontent.com/decoderleco/deces_europe"
  
  /**
   * 
   * @param gitVersion 
   * @param filePathInRepo 
   * @param dataWorkDir 
   */
  constructor(protected gitVersion: string, protected filePathInRepo: string, protected dataWorkDir?: string) {
    this.gitVersion = gitVersion
    if (filePathInRepo == "") {
      throw new Error(`[DecoderLecoGithubDataIngester] - [filePathInRepo] second argument of constructor must not be an ampty string`);
    }
    if (filePathInRepo.substring(0,2) == './') {
      // console.log(` >>> yes it starts with [./]`)
      // console.log(` return [${filePathInRepo.substring(2,filePathInRepo.length)}]`)
      this.filePathInRepo = filePathInRepo.substring(2,filePathInRepo.length);
    } else {
      // console.log(` >>> no it does not start with [./]`)
      // console.log(` return [${filePathInRepo}]`)
      this.filePathInRepo = filePathInRepo;
    }
    this.dataWorkDir = dataWorkDir || `./data_pipeline_workdir`
  }
  async run() {
    await this.createDir()
    await this.download()
  }

  getIngestedDataFileFolderPath(): string {
    let folderPath: string = ``;
    folderPath = this.filePathInRepo.split("/").slice(0,-1).join("/")
    return folderPath;
  }
  public createDir(): void {
    let folderToCreate = `${this.dataWorkDir}/${this.getIngestedDataFileFolderPath()}`;
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
    let splittedFilePath = this.filePathInRepo.split("/");
    let filename: string = splittedFilePath[splittedFilePath.length - 1]
    return filename;
  }
  */

  async download() {
    // console.log("download: ", DecoderLecoGithubDataIngester.baseUrl + this.gitVersion + this.filePathInRepo)
    const res = await fetch( `${DecoderLecoGithubDataIngester.baseUrl}/${this.gitVersion}/${this.filePathInRepo}` )
    if (!res.ok) {
      // console.log((`error while fetching ${DecoderLecoGithubDataIngester.baseUrl + this.gitVersion + this.filePathInRepo}`))
      throw new Error(`HTTP - ${res.statusText} - ${res.status} - An Error occured while fetching [${DecoderLecoGithubDataIngester.baseUrl}/${this.gitVersion}/${this.filePathInRepo}]`)
    }
    const text = await res.text()
    try {
      fs.writeFileSync( `${this.dataWorkDir}/${this.filePathInRepo}`, text, 
        { 
          encoding: 'utf8',
          flag: 'w',
          mode: 0o666
        }, 
      )
      return (`[${this.gitVersion}] version of File ${this.filePathInRepo} has succesfully been downloaded from [https://github.com/decoderleco/deces_europe.git]`)
    } catch (err) {
      // console.log("error while writing " + this.filePathInRepo + ": ", err)
      throw new Error(`Failed to download [${this.gitVersion}] version of File ${this.filePathInRepo} from [https://github.com/decoderleco/deces_europe.git]`, {
        cause: err
      })
    }
  }
}