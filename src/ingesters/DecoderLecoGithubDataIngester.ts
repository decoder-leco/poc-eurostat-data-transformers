import * as fs from "node:fs"

/**
 * Classe d'DecoderLecoGithubDataIngesteration d'un depuis le repos deces_europe de decoderleco
 *  Téléchargement & copie locale afin d'archiver
 */
export class DecoderLecoGithubDataIngester {
  static baseUrl: string = "https://raw.githubusercontent.com/decoderleco/deces_europe/"
  gitVersion ="main/"
  filePathInRepo = "data/csv/"

  /**
   *  RECUPERATION D'UN DATASET & COPIE LOCALE
   * 
   * @param fileName    dataset to set    [ex: proj_19np__custom_2224172_linear.csv ]
   * @param rawPath   local path        [plz this format atm (./dir/filename.ext)]
   */
  constructor(protected fileName: string, protected rawPath: string) {
    this.fileName = fileName
    this.rawPath = rawPath  
  }

  async run() {
    await this.createDir()
    await this.download()
  }

  createDir() {
    if (fs.existsSync(this.rawPath.split("/")[1]) == false) {
      fs.mkdirSync( this.rawPath.split("/")[1])
      console.log("mkdir " + this.rawPath.split("/")[1] )
    } else {
      return ("directory allready exist")
    }
  }

  async download() {
    const res = await fetch( DecoderLecoGithubDataIngester.baseUrl + this.fileName + DecoderLecoGithubDataIngester.format)
    const text = await res.text()
    try {
      fs.writeFileSync( this.rawPath, text, 
        { 
          encoding: 'utf8',
          flag: 'w',
          mode: 0o666
        }, 
      )
    } catch (err) {
      console.log("error while writing " + this.rawPath + this.fileName + ": ", err)
    }
  }
}