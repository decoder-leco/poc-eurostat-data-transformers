import * as fs from "node:fs"

const baseUrl = "https://raw.githubusercontent.com/decoderleco/deces_europe/main/data/csv/"
const format = ""

export async function download(remote: string, rawPath: string){
  const res = await fetch( baseUrl + remote + format)
  const text = await res.text()
  try {
    fs.writeFileSync( rawPath, text, 
      { 
        encoding: 'utf8',
        flag: 'w',
        mode: 0o666
      }, 
    )
    return('file downloaded')
  } catch (err) {
    return("error while writing " + rawPath + remote + ": " + err)
  }
}
