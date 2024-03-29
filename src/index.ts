import * as projectionDePopulation from "./ingesters"

 const DecoderLecoGithubDataIngester = new projectionDePopulation.DecoderLecoGithubDataIngester(
  "proj_19np__custom_2224172_linear.csv",
    "./rawData/proj_19np.csv"
 )

const transform = new projectionDePopulation.Transform(
    "./rawData/proj_19np.csv",
    "./transformedData/proj_19np_transformed.csv"
  )

const run = async() => { 
  await DecoderLecoGithubDataIngester.run() 
  await transform.run()
}

run()
