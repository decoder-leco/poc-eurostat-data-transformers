import { StreamedConverter, regexp } from './utils'
import * as fs from 'node:fs'

/*
  tested with https://raw.githubusercontent.com/decoderleco/deces_europe/main/data/csv/proj_19np__custom_2224172_linear.csv
  renamed as estat_proj_19np.tsv
*/

const reg: regexp[] = [
  { from: /\\/, to: ','},
  { from: /\t/g, to: ','}
]
const sourceFile = '../data_pipeline_tests/data/estat_proj_19np.tsv'
const test = new StreamedConverter(
  sourceFile, 
  reg ,
  true
).toFile('../data_pipeline_tests/data/estat_proj_19np_csvCleaned.csv')