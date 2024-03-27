#! /usr/bin/env node

import { Command, OptionValues } from "commander"
import { exit, stdin as input, stdout as output } from 'node:process';
import {ProjectionsDePopulation2019_2024 as Projection} from "./ProjectionsDePopulation2019_2024"

// CLI functions
const getHasCli = (prefix: string, alias = undefined) => {
  const prefixIndex = process.argv.findIndex(
    (arg) => arg === prefix || (alias && arg === alias)
  );
  return prefixIndex > 0;
};

const getCliData = (prefix: string, alias = undefined) => {
  let data = undefined;
  const prefixIndex = process.argv.findIndex(
    (arg) => arg === prefix || (alias && arg === alias)
  );
  if (prefixIndex > 0) {
    const cliData = process.argv[prefixIndex + 1] ?? undefined;
    if (cliData) {
      data = cliData.includes("-") ? undefined : cliData;
    }
  }
  return data;
};

// PDP command line features
const PDP = new Command()
PDP.version("1.0.0")
  .description("Decoder l'eco ELT module for eurostat population projection 2019/2024")
  //.option("-l, --ls  [value]", "List directory contents")
  //.option("-m, --mkdir <value>", "Create a directory")
  //.option("-t, --touch <value>", "Create a file")
  .option("-r, --remote", "define remote url")
  .option("-l, --logs", "show logs in the console")
  .option("-df, --dataframe", "show dataframe in the console")
  .option("-rd, --rawdir", "define raw data directory")
  .option("-td, --transformdir", "define transformed data directory")
  .parse(process.argv)

const PDPopts: OptionValues = PDP.opts()
const mandatoryOptions: string[] = []
let failed: boolean = false
for (const option of mandatoryOptions) {
  if ( JSON.stringify(PDPopts).replace(option, '') == JSON.stringify(PDPopts)) {
    console.log(`mandatory option ${option}: failed`)
    failed = true
  }
}

if (failed == true)
  try { throw new Error(` command line options failed `); } 
  catch(e){ console.log(`command line options failed `, e); exit(1); }

  interface Options {
    log: boolean
    showDataFrame: boolean
  }

let remote: string = ""
let raw: string | undefined = ""
let transform: string | undefined = ""
let options: Options = { log: false, showDataFrame: false }

if (PDPopts.remote) 
  remote = getCliData("-r") || "undefined" //PDPopts.remote
else remote = "https://raw.githubusercontent.com/decoderleco/deces_europe/main/data/csv/proj_19np__custom_2224172_linear.csv"

if (PDPopts.logs) {
  options.log = PDPopts.logs
}
if (PDPopts.dataframe) {
  options.showDataFrame = PDPopts.dataframe
}
if (PDPopts.rawdir) 
  raw = getCliData("-rd") || "undefined" //PDPopts.rawdir
else raw = "./rawData/proj_19np.csv"

if (PDPopts.transformdir) 
  transform = getCliData("td") || "undefined"// PDPopts.transformdir
else transform = "./transformedData/proj_19np_transformed.csv"

console.log(
  "remote: ", remote,
  "raw: ", raw,
  "transform: ", transform,
  "options: ", options
)

/*
const proj = new Projection(
  //"https://ec.europa.eu/eurostat/api/dissemination/sdmx/2.1/data/proj_19np?format=TSV", 
  "https://raw.githubusercontent.com/decoderleco/deces_europe/main/data/csv/proj_19np__custom_2224172_linear.csv",
  "./rawData/proj_19np.csv",
  "./transformedData/proj_19np_transformed.csv",
  //{ log: true, showDataFrame: false}
)
*/


const proj = new Projection(
  remote,
  raw,
  transform,
  options
)

proj.run()

