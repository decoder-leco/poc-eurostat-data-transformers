import * as projection from "../../src/ingesters"
import * as fs from 'node:fs'

const testFilePathInEurostat = "demo_magec"
const testDataWorkDir = "data_pipeline_tests/eurostat"
const ingester = 
  new projection.DecoderLecoEurostatDataIngester(testFilePathInEurostat, "/?format=SDMX-CSV", testDataWorkDir)

describe('Testing - DecoderLecoGithubDataIngester', () => {

  describe('Test when the directory already exist', () => {
    beforeEach(  () => {
      try {
        fs.mkdirSync( `${testDataWorkDir}/}`, { recursive: true} )
      } catch (err) {
        console.log(`in beforeEach creation of [${testDataWorkDir}/] failed`, err)
      }
    })

    afterEach( () => {
      try {
        fs.rmSync( `${testDataWorkDir}/}`, { recursive: true })
      } catch (err) {
        console.log(`In afterEach deletion of [${testDataWorkDir}/}] failed`, err)
      }
    })

    it('createDir shall not create the directory when it already exist', async () => {
      // Test de la presence du directory
      expect(fs.existsSync(`${testDataWorkDir}/`)).toBe(true)

      const result = await ingester.createDir()

      // Test du retour createDir
      expect(result.split(" ")[0]).toEqual('Skipped')
      // Test de la presence du diretory créé
      expect(fs.existsSync(`${testDataWorkDir}/`)).toBe(true)
    })
  })
    
  describe('Test when the directory doesnt exist', () => {
    beforeEach( () => {
      try {
        if (fs.existsSync(`${testDataWorkDir}/`)) {
          fs.rmSync( `${testDataWorkDir}/`, { recursive: true })
        }
      } catch (err) {
        console.log(`In beforeEach deletion of [${testDataWorkDir}/] failed`, err)
      }
    })

    afterEach( () => {
      try {
        fs.rmSync( `${testDataWorkDir}/`, { recursive: true })
      } catch (err) {
        console.log(`In afterEach deletion of [${testDataWorkDir}/] failed`, err)
      }
    })

    it('createDir shall create the directory when it doesnt exist', async () => {
      // Test de la presence du directory
      expect(fs.existsSync(`${testDataWorkDir}/`)).toBe(false)

      const result = await ingester.createDir()
      
      // Test du retour createDir
      expect(result.split(" ")[0]).toEqual('directory')
      // Test de la presence du directory
      expect(fs.existsSync(`${testDataWorkDir}/`)).toBe(true)
    })
  })

  describe('Tests about the downloaded file',  () => {
    beforeEach( () => { // Nous aurons besoins du directory local disponible pour les tests suivants
      ingester.createDir() 
    })

    afterEach( () => {  // Cleanup du directory local
      try {
        fs.rmSync( `${testDataWorkDir}/`, { recursive: true })
      } catch (err) {
        console.log(`in afterEach deletion of [${testDataWorkDir}/] failed`, err)
      }
    })

    it('Test if the file was downloaded', async () => {
      const result = await ingester.download()

      // Test du retour de download()
      expect(result.split(" ")[0]).toEqual("File")      
      // Test de la presence du fichier à ingest dans sa destination
      expect(fs.existsSync(`${testDataWorkDir}/${testFilePathInEurostat}.csv`)).toBe(true)
      // Test if the file isnt empty
      expect(fs.readFileSync(`${testDataWorkDir}/${testFilePathInEurostat}.csv`, { encoding: 'utf8', flag: 'r' }).length == 0 ).toBe(false)
      // Test if the file containt "404 error" as text
      expect(fs.readFileSync(`${testDataWorkDir}/${testFilePathInEurostat}.csv`, { encoding: 'utf8', flag: 'r' }) == "404 error" ).toBe(false)
    }, 
    // large timeout for large files
    500000)
  })
})