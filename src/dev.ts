import pl from "nodejs-polars"
import { DecoderLecoGithubDataIngester as DataIngester } from "./ingesters"
import { DecoderLecoGithubDataTransformer as DataTransformer } from "./transformers"

const populationProjection_2019_2024_Ingester = new DataIngester(
  "main",
  "data/csv/proj_19np__custom_2224172_linear.csv",
  `./data_pipeline_workdir/42`
)

const populationProjection_2019_2024_Transformer = new DataTransformer(
  "./data_pipeline_workdir/42/data/csv/proj_19np__custom_2224172_linear.csv",
  "./data_pipeline_workdir/42/transformedData/proj_19np_transformed.csv"
)

const runExamplePipeline = async(): Promise<pl.DataFrame> => { 
  await populationProjection_2019_2024_Ingester.run() 
  return await populationProjection_2019_2024_Transformer.run()
}

runExamplePipeline()