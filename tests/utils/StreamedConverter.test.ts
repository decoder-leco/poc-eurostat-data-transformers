import { StreamedConverter } from '../../src/utils'
import * as fs from 'node:fs'

const sourcefile: string = './data_pipeline_tests/data/estat_proj_19np.tsv'
const destfile: string = './data_pipeline_tests/data/estat_proj_19np.csv'

describe('Test de la convertion en mode stream', () => {
  beforeEach( () => {
    try {
      if (fs.existsSync(destfile)) fs.rmSync(destfile)
    } catch(err) {
      console.log('error beforeEach: ', err)
    }
  })

  afterAll( () => {
    try {
      setTimeout(() => fs.rmSync(destfile), 500)
    } catch(err) {
      console.log('error afterAll: ', err)
    }
  })

  it("test de l'existence du fichier converti avec la methode toFile()", async () => {
    
    expect(fs.existsSync(destfile)).toBe(false)

    new StreamedConverter(
      sourcefile, 
      [
        { from: /\\/, to: ','},
        { from: /\t/g, to: ','}
      ],
      false
    ).toFile(destfile)

    process.nextTick(
      () => { expect(fs.existsSync(destfile)).toBe(true) }
    )
    expect.assertions(1)
  })
})