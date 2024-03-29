import { handleDirs } from "./handleDir"
import { download } from "./download"

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
    await handleDirs(this.rawPath)
    await download(this.remote ,this.rawPath)
  }
}