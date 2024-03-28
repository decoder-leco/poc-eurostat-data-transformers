import * as projectionDePopulation from "./projectionDePopulation2019-2024"
export * as abricot from './abricot/';
export * as pomme from './pomme/';
/*
const ingest = new projectionDePopulation.Ingest(
    "proj_19np__custom_2224172_linear.csv",
    "./rawData/proj_19np.csv"
  )
*/

/*
 const ingest = new projectionDePopulation.Ingest()
 ingest.init(
  "proj_19np__custom_2224172_linear.csv",
    "./rawData/proj_19np.csv"
 )

const transform = new projectionDePopulation.Transform(
    "./rawData/proj_19np.csv",
    "./transformedData/proj_19np_transformed.csv"
  )

const run = async() => { 
  await ingest.run() 
  await transform.run()
}

run()


*/