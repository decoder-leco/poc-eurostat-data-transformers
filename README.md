![Décoder l'éco](https://raw.githubusercontent.com/decoder-leco/poc-eurostat-data-transformers/feature/circleci/pipeline/%232/docs/images/small_decoder_leco_org.jpg)
--

# Décoder l'éco: A EuroStat Data Transformers Proof of Concept

A Proof of Concept package to build Data Pipelines from Eurostat DataSources.

## How to Use

* first, install the package:

```bash
npm i @decoder-leco/poc-eurostat-data-transformers
# pnpm add @decoder-leco/poc-eurostat-data-transformers
```

* Then, in your code, you can create this very first simple data pipeline, which pulls data from CSV files in the <https://github.com/decoderleco/deces_europe> repository:

```TypeScript
import pl from "nodejs-polars"
import { ingesters, transformers } from "@decoder-leco/poc-eurostat-data-transformers"

/**
 * This will pull https://github.com/decoderleco/deces_europe/blob/main/data/csv/proj_19np__custom_2224172_linear.csv
 */
const populationLinearProjection_2019_2024_Ingester = new ingesters.DecoderLecoGithubDataIngester(
  "main", // may be a git branch, a git tag, or a git commit hash
  "data/csv/proj_19np__custom_2224172_linear.csv", // path in the repo of the CSV file
  `./data_pipeline_workdir/42` // any folder path in the local filesystem, as you choose, where the file will locally be persisted
)

const populationLinearProjection_2019_2024_Transformer = new transformers.DecoderLecoGithubDataTransformer(
  "./data_pipeline_workdir/42/data/csv/proj_19np__custom_2224172_linear.csv",
  "./data_pipeline_workdir/42/transformedData/proj_19np_transformed.csv"
)

const runExamplePipeline = async(): Promise<pl.DataFrame> => { 
  await populationLinearProjection_2019_2024_Ingester.run() 
  return await populationLinearProjection_2019_2024_Transformer.run()
}

const resultDF = await runExamplePipeline()
```

* Another example, with <https://github.com/decoderleco/deces_europe/blob/main/data/csv/deces_ireland.csv> :

```TypeScript
import pl from "nodejs-polars"
import { ingesters, transformers } from "@decoder-leco/poc-eurostat-data-transformers/"

/**
 * This will pull https://github.com/decoderleco/deces_europe/blob/main/data/csv/deces_ireland.csv
 */
const irelandPopulationDeathsData_Ingester = new ingesters.DecoderLecoGithubDataIngester(
  "main", // may be a git branch, a git tag, or a git commit hash
  "data/csv/deces_ireland.csv", // path in the repo of the CSV file
  `./data_pipeline_workdir/42` // any folder path in the local filesystem, as you choose, where the file will locally be persisted
)

const irelandPopulationDeathsData_Transformer = new transformers.DecoderLecoGithubDataTransformer(
  "./data_pipeline_workdir/42/data/csv/deces_ireland.csv",
  "./data_pipeline_workdir/42/transformedData/deces_ireland.csv"
)

const runExamplePipeline = async(): Promise<pl.DataFrame> => { 
  await irelandPopulationDeathsData_Ingester.run() 
  await irelandPopulationDeathsData_Transformer.run()
}

const resultDF = await runExamplePipeline()
```
