import {ProjectionsDePopulation2019_2024 as Projection} from "./ProjectionsDePopulation2019_2024"

const proj = new Projection(
  //"https://ec.europa.eu/eurostat/api/dissemination/sdmx/2.1/data/proj_19np?format=TSV", 
  "https://raw.githubusercontent.com/decoderleco/deces_europe/main/data/csv/proj_19np__custom_2224172_linear.csv",
  "./rawData/proj_19np.csv",
  "./transformedData/proj_19np_transformed.csv",
  //{ log: true, showDataFrame: false}
)

proj.run()

