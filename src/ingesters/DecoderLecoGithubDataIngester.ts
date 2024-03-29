import * as fs from "node:fs"

/**
 * Classe d'DecoderLecoGithubDataIngesteration d'un depuis le repos deces_europe de decoderleco
 *  Téléchargement & copie locale afin d'archiver
 */
export class DecoderLecoGithubDataIngester {
  static baseUrl: string = "https://raw.githubusercontent.com/decoderleco/deces_europe/"

  /**
   *  RECUPERATION D'UN DATASET & COPIE LOCALE
   * 
   * @param fileName    dataset to set    [ex: proj_19np__custom_2224172_linear.csv ]
   * @param rawPath   local path        [plz this format atm (./dir/filename.ext)]
   */
  constructor(protected gitVersion: string, protected filePathInRepo: string) {
    this.gitVersion = gitVersion
    this.filePathInRepo = filePathInRepo  
  }

  async run() {
    await this.createDir()
    await this.download()
  }

  createDir() {
    // console.log("path : ", this.filePathInRepo.substring(0, this.filePathInRepo.lastIndexOf("/")))
    if (fs.existsSync(this.filePathInRepo.substring(0, this.filePathInRepo.lastIndexOf("/"))) == false) {
      fs.mkdirSync( this.filePathInRepo.substring(0, this.filePathInRepo.lastIndexOf("/")), { recursive: true } )
      // console.log("mkdir " + this.filePathInRepo.substring(0, this.filePathInRepo.lastIndexOf("/")) )
      return (`directory ${this.filePathInRepo.substring(0, this.filePathInRepo.lastIndexOf("/"))} created`)
    } else {
      return (`directory ${this.filePathInRepo.substring(0, this.filePathInRepo.lastIndexOf("/"))} allready exist`)
    }
  }

  async download() {
    // console.log("download: ", DecoderLecoGithubDataIngester.baseUrl + this.gitVersion + this.filePathInRepo)
    const res = await fetch( DecoderLecoGithubDataIngester.baseUrl + this.gitVersion + this.filePathInRepo )
    if (!res.ok) {
      // console.log((`error while fetching ${DecoderLecoGithubDataIngester.baseUrl + this.gitVersion + this.filePathInRepo}`))
      return (`error while fetching ${DecoderLecoGithubDataIngester.baseUrl + this.gitVersion + this.filePathInRepo}`)
    }
    const text = await res.text()
    try {
      fs.writeFileSync( this.filePathInRepo, text, 
        { 
          encoding: 'utf8',
          flag: 'w',
          mode: 0o666
        }, 
      )
      return (`File ${this.filePathInRepo} has succesfully been download `)
    } catch (err) {
      // console.log("error while writing " + this.filePathInRepo + ": ", err)
      return (`File ${this.filePathInRepo} failed to download `)
    }
  }
}