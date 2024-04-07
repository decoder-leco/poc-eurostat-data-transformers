import * as ingesters from "../../src/ingesters"
import * as fs from 'node:fs'
// ${testDataWorkDir}/${testFilePathInRepo}
// ${testDataWorkDir}/${ingester.getIngestedDataFileFolderPath()}
const testFilePathInRepo = "data/csv/deces_ireland.csv"
const testDataWorkDir = "data_pipeline_tests"
const ingester = 
  new ingesters.DecoderLecoGithubDataIngester("main", testFilePathInRepo, testDataWorkDir)
  
describe('Testing - DecoderLecoGithubDataIngester', () => {

  describe('Test when the directory already exist', () => {
    beforeEach(  () => {
      try {
        fs.mkdirSync( `${testDataWorkDir}/${ingester.getIngestedDataFileFolderPath()}`, { recursive: true} )
      } catch (err) {
        console.log(`in beforeEach creation of [${testDataWorkDir}/${ingester.getIngestedDataFileFolderPath()}] failed`, err)
      }
    })

    afterEach( () => {
      try {
        fs.rmSync( `${testDataWorkDir}/${ingester.getIngestedDataFileFolderPath()}`, { recursive: true })
      } catch (err) {
        console.log(`In afterEach deletion of [${testDataWorkDir}/${ingester.getIngestedDataFileFolderPath()}] failed`, err)
      }
    })

    it('createDir shall not create the directory when it already exist', () => {
      // Test de la presence du directory
      expect(fs.existsSync(`${testDataWorkDir}/${ingester.getIngestedDataFileFolderPath()}`)).toBe(true)

      const result = ingester.createDir() 
      // Test de la presence du diretory créé
      expect(fs.existsSync(`${testDataWorkDir}/${ingester.getIngestedDataFileFolderPath()}`)).toBe(true)
    })
  })
    
  describe('Test when the directory doesnt exist', () => {
    beforeEach( () => {
      try {
        if (fs.existsSync(`${testDataWorkDir}/${ingester.getIngestedDataFileFolderPath()}`)) {
          fs.rmSync( `${testDataWorkDir}/${ingester.getIngestedDataFileFolderPath()}`, { recursive: true })
        }
      } catch (err) {
        console.log(`In beforeEach deletion of [${testDataWorkDir}/${ingester.getIngestedDataFileFolderPath()}] failed`, err)
      }
    })

    afterEach( () => {
      try {
        fs.rmSync( `${testDataWorkDir}/${ingester.getIngestedDataFileFolderPath()}`, { recursive: true })
      } catch (err) {
        console.log(`In afterEach deletion of [${testDataWorkDir}/${ingester.getIngestedDataFileFolderPath()}] failed`, err)
      }
    })

    it('createDir shall create the directory when it doesnt exist', () => {
      // Test de la presence du directory
      expect(fs.existsSync(`${testDataWorkDir}/${ingester.getIngestedDataFileFolderPath()}`)).toBe(false)
      ingester.createDir()
      // Test de la presence du directory
      expect(fs.existsSync(`${testDataWorkDir}/${ingester.getIngestedDataFileFolderPath()}`)).toBe(true)
    })
  })

  describe('Tests about the downloaded file',  () => {
    beforeEach( () => { // Nous aurons besoins du directory local disponible pour les tests suivants
      ingester.createDir() 
    })

    afterEach( () => {  // Cleanup du directory local
      try {
        fs.rmSync( `${testDataWorkDir}/${ingester.getIngestedDataFileFolderPath()}`, { recursive: true })
      } catch (err) {
        console.log(`in afterEach deletion of [${testDataWorkDir}/${ingester.getIngestedDataFileFolderPath()}] failed`, err)
      }
    })

    it('Test if the file was downloaded', async () => {
      await ingester.download()
      
      // Test de la presence du fichier à ingest dans sa destination
      expect(fs.existsSync(`${testDataWorkDir}/${testFilePathInRepo}`)).toBe(true)
      // Test if the file isnt empty
      expect(fs.readFileSync(`${testDataWorkDir}/${testFilePathInRepo}`, { encoding: 'utf8', flag: 'r' }).length == 0 ).toBe(false)
      // Test if the file containt "404 error" as text
      expect(fs.readFileSync(`${testDataWorkDir}/${testFilePathInRepo}`, { encoding: 'utf8', flag: 'r' }) == "404 error" ).toBe(false)
    })
  })
})
