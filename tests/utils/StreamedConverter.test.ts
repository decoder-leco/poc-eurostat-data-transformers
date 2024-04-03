import { StreamedConverter } from '../../src/utils'
import * as fs from 'node:fs'

const sourcefile: string = 'data_pipeline_tests/data/estat_proj_19np.tsv'
const destfile: string = './data_pipeline_tests/data/estat_proj_19np.csv'

describe('Test de la convertion en mode stream', () => {
  beforeEach( () => {
    if (fs.existsSync(destfile))
      fs.rmSync(destfile)
  })

  afterAll( () => {
    if (fs.existsSync(destfile))
      fs.rmSync(destfile)
  })

  it("test de la l'existence du fichier converti avec la methode tofile()", async () => {
    expect(fs.existsSync(destfile)).toBe(false)
    const test = new StreamedConverter(
      sourcefile, 
      [
        { from: /\\/, to: ','},
        { from: /\t/g, to: ','}
      ],
      false
    )

    test.toFile(destfile)
    process.nextTick(
      () => { expect(fs.existsSync(destfile)).toBe(true) }
    )
    //expect(fs.existsSync(destfile)).toBe(true)
  })
})