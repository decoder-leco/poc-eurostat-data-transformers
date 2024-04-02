import * as fs from 'node:fs'

interface regexp {
  from: RegExp
  to: string
}
/**
 * convert sdmx file to csv
 * converted file will be copyed as <filename>_cleaned.csv
 * 
 * usage:
 *  const test = new ToCsvConverter('estat_proj_19np.tsv', '', false).run()
 * 
 */
export class ToCsvConverter {
  static ext: string
  static rgx: regexp[] = [
    { from: /\\/, to: ','},
    { from: /\t/g, to: ','}
  ]

  /**
   * @param file <string> path to the file to convert
   * @param format <string> (optional)force type convertion
   * @param verbose <boolean> verbose mode
   */
  constructor(protected file: string, protected format?: string, protected verbose?: boolean) {
    this.file = file
    this.format = format
    ToCsvConverter.ext = format || file.split('.')[1]
    this.verbose = verbose || false
  }

  async convertLargeFile() {
    try {
      const readStream = fs.createReadStream(this.file);
      const writeStream = fs.createWriteStream(this.file.split('.')[0]+'_cleaned.csv')
      readStream.on('data', chunk => {
          // process the data chunk
          let data: string = chunk.toString() 
          for (let i: number = 0; i < ToCsvConverter.rgx.length; i++)
            data = data.replace( ToCsvConverter.rgx[i].from, ToCsvConverter.rgx[i].to) 
          writeStream.write(data)
      });
      
      readStream.on('end', () => {
          console.log('file has been converted completely')
      });
    } catch (err) {
        console.error(err)
    }
  }

  async run() {
    if (this.format == '') {
      if (this.verbose) console.log("type = default")
      await this.convertLargeFile()
    }else {
      switch(ToCsvConverter.ext) {
        case "sdmx" :
          if (this.verbose) console.log("type = sdmx")
          ToCsvConverter.rgx = [
            { from: /\\/, to: ','},
            { from: /\t/g, to: ','}
          ]
          await this.convertLargeFile()
          break
        case "tsv":
          if (this.verbose) console.log("type = tsv")
          ToCsvConverter.rgx = [
            { from: /\t/g, to: ','}
          ]
          await this.convertLargeFile()
          break;
      }
    }
  }
}