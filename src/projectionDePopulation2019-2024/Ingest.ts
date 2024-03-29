import * as fs from "node:fs"

/**
 * Classe d'ingestation d'un depuis le repos deces_europe de decoderleco
 *  Téléchargement & copie locale afin d'archiver
 */
export class Ingest {
  static baseUrl: string = "https://raw.githubusercontent.com/decoderleco/deces_europe/main/data/csv/"
  static format: string = ""

  /**
   *  RECUPERATION D'UN DATASET & COPIE LOCALE
   * 
   * @param remote    dataset to set    [ex: proj_19np__custom_2224172_linear.csv ]
   * @param rawPath   local path        [plz this format atm (./dir/filename.ext)]
   */
  constructor(protected remote: string, protected rawPath: string) {
    this.remote = remote
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
    }
  }

  async download() {
    const res = await fetch( Ingest.baseUrl + this.remote + Ingest.format)
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
      console.log("error while writing " + this.rawPath + this.remote + ": ", err)
    }
  }
}