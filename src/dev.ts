import * as ingesters from "./ingesters"
import * as Transformers from "./transformers"

 const DecoderLecoGithubDataIngester = new ingesters.DecoderLecoGithubDataIngester(
  "main/",
  "data/csv/proj_19np__custom_2224172_linear.csv",
 )

const transform = new Transformers.Transform(
  "data/csv/proj_19np__custom_2224172_linear.csv",
  "./transformedData/proj_19np_transformed.csv"
)

const run = async() => { 
  await DecoderLecoGithubDataIngester.run() 
  await transform.run()
}

run()

