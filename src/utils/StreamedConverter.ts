import * as fs from 'node:fs'

export interface regexp {
  from: RegExp
  to: string
}

/**
 * convert [sdmx,tsv, ...] file to regular csv with streaming method for very large files
 * 
 * usage:
 *  const test = new ToCsvConverter(
 *    './data_pipeline_tests/data/estat_proj_19np.tsv',                           // source file input
 *      [                                                                        
 *        { from: /\\/, to: ','},                                               // your every regexp
 *        { from: /\t/g, to: ','}
 *      ], 
 *      false                                                                // verbose mode
*    ).toFile(./data_pipeline_tests/data/estat_proj_19np_csvCleaned.csv)    // outputed file
 * 
 */
export class StreamedConverter {
  /**
   * @param file    path to the source file to convert   (type: string)
   * @param rgx     [ { from: /\\/, to: ','}, { from: /\t/g, to: ','}, ... ]  (type: regexp[])
   * @param verbose verbose mode  (type: boolean)
   */

  constructor(protected file: string, protected rgx: regexp[], protected verbose: boolean = false) {
    if (!fs.existsSync(this.file))
      throw new Error(`${this.file} doesn't exist`)
    this.file = file
    this.rgx = rgx
    this.verbose = verbose || false
  }

  async toFile(dest: string): Promise<string> {

    if (!fs.existsSync(this.file)) {
      throw new Error(`${this.file} doesn't exist`)
    }

    return new Promise( (resolve, reject) => {

      const readStream: fs.ReadStream = fs.createReadStream(this.file);
      const writeStream: fs.WriteStream = fs.createWriteStream(dest)
      let inc: number = 0
      const start: number = Date.now()

      try {
        readStream.on('data', chunk => {
            // process the data chunk
            let data: string = chunk.toString() 
            this.rgx.forEach( (reg: regexp) => data = data.replace( reg.from, reg.to ))
            writeStream.write(data)
            inc++
        })
        
        readStream.on('end', () => {
          if (this.verbose) console.log(
            `File has been converted completely in ${dest}\n(${inc} chunks parsed in ${Date.now() - start} ms)`
            )
          resolve(`File has been converted completely in ${dest}\n(${inc} chunks parsed in ${Date.now() - start} ms)`)
        })

      } catch (err) {
        console.log(`error: ${err}`)
        reject('error: '+ err)
      }
    })
  }
}