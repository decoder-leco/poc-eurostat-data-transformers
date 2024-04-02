import { ToCsvConverter } from './ToCsvConverter'

/*
  tested with https://raw.githubusercontent.com/decoderleco/deces_europe/main/data/csv/proj_19np__custom_2224172_linear.csv
  renamed as estat_proj_19np.tsv
*/

const test = new ToCsvConverter('estat_proj_19np.tsv', '', false).run()