import { StreamedConverter, regexp } from './utils'

/*
  tested with https://raw.githubusercontent.com/decoderleco/deces_europe/main/data/csv/proj_19np__custom_2224172_linear.csv
  renamed as estat_proj_19np.tsv
*/

const reg: regexp[] = [
  { from: /\\/, to: ','},
  { from: /\t/g, to: ','}
]

new StreamedConverter(
  '../data_pipeline_tests/data/estat_proj_19np.tsv', 
  reg ,
  true
).toFile('../data_pipeline_tests/data/estat_proj_19np_csvCleaned.csv')