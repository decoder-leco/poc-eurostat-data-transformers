import { StreamedConverter, regexp } from '../../src/utils'
import * as fs from 'node:fs'

const sourcefile: string = './data_pipeline_tests/data/estat_proj_19np.tsv'
const destfile: string = './data_pipeline_tests/data/estat_proj_19np_csvCleaned.csv'

const test = new StreamedConverter(
  sourcefile, 
  [
    { from: /\\/, to: ','},
    { from: /\t/g, to: ','}
  ],
  false
)

describe('Test de la convertion en mode stream', () => {
  beforeEach( () => {
    if (fs.existsSync(destfile))
      fs.rmSync(destfile)
  })
/*
  afterEach( () => {
    if (fs.existsSync(destfile))
      fs.rmSync(destfile)
  })
*/
  it("test de la l'existence du fichier converti avec la methode tofile()", () => {
    expect(fs.existsSync(destfile)).toBe(false)
    new Promise(() => test.toFile(destfile)).then(() =>
      expect(fs.existsSync(destfile)).toBe(true)
    )
  })
})