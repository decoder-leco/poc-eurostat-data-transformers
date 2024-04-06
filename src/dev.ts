import pl from "nodejs-polars"
import * as DataIngester from "./ingesters"
import { DecoderLecoGithubDataTransformer as DataTransformer } from "./transformers"

const populationProjection_2019_2024_Ingester = new DataIngester.DecoderLecoGithubDataIngester(
  "main",
  "data/csv/proj_19np__custom_2224172_linear.csv",
  `./data_pipeline_workdir/42`
);

  // https://ec.europa.eu/eurostat/api/dissemination/sdmx/2.1/data/demo_pjan/?format=SDMX-CSV
const pjan = new DataIngester.DecoderLecoEurostatDataIngester('demo_pjan','/?format=SDMX-CSV')

const runExamplePipeline = async(): Promise<pl.DataFrame> => { 

   await populationProjection_2019_2024_Ingester.run() 

  /* initalise transformers class after running the ingestion class */
  
  const populationProjection_2019_2024_Transformer = new DataTransformer(
    "./data_pipeline_workdir/42/data/csv/proj_19np__custom_2224172_linear.csv",
    "./data_pipeline_workdir/42/transformedData/proj_19np_transformed.csv"
  )
  
  return await populationProjection_2019_2024_Transformer.run()

}

//runExamplePipeline()
//( async () => await populationProjection_2019_2024_Ingester.run() )()
( async () => {
  await pjan.createDir()
  console.log( await pjan.download() )
})()