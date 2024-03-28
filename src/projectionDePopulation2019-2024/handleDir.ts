import * as fs from "node:fs"

export async function handleDirs(rawPath :string) {
  if (fs.existsSync(rawPath.split("/")[1]) == false) {
    fs.mkdirSync( rawPath.split("/")[1])
    console.log("mkdir " + rawPath.split("/")[1] )
  }
}