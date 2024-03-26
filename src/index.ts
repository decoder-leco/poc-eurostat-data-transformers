import {ProjectionsDePopulation2019_2024 as Projection} from "./ProjectionsDePopulation2019_2024"

const proj = new Projection(
  "https://ec.europa.eu/eurostat/api/dissemination/sdmx/2.1/data/proj_19np?format=TSV", 
  "./rawData/proj_19np.csv",
  "./transformedData/proj_19np_transformed.csv"
)
proj.run()

