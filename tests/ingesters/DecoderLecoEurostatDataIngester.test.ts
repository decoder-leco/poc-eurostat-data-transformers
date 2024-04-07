import * as ingesters from "../../src/ingesters"
import * as fs from 'node:fs'
// ${testDataWorkDir}/${testFilePathInRepo}
// ${ingester.getIngestedDataFileFolderPath()}
const SECONDS = 1000;
const testDataWorkDir = "data_pipeline_tests"
const ingester = 
  new ingesters.DecoderLecoEurostatDataIngester(`demo_pjan`, ingesters.EurostatDatasetFormat.SDMX_CSV, testDataWorkDir)
  
describe('Testing - DecoderLecoEurostatDataIngester', () => {

  describe('Test when the directory already exist', () => {
    beforeEach(  () => {
      try {
        fs.mkdirSync( `${ingester.getIngestedDataFileFolderPath()}`, { recursive: true} )
      } catch (err) {
        console.log(`in beforeEach creation of [${ingester.getIngestedDataFileFolderPath()}] failed`, err)
      }
    })

    afterEach( () => {
      try {
        fs.rmSync( `${ingester.getIngestedDataFileFolderPath()}`, { recursive: true })
      } catch (err) {
        console.log(`In afterEach deletion of [${ingester.getIngestedDataFileFolderPath()}] failed`, err)
      }
    })

    it('createDir shall not create the directory when it already exist', () => {
      // Test de la presence du directory
      expect(fs.existsSync(`${ingester.getIngestedDataFileFolderPath()}`)).toBe(true)

      const result = ingester.createDir() 
      // Test de la presence du diretory créé
      expect(fs.existsSync(`${ingester.getIngestedDataFileFolderPath()}`)).toBe(true)
    })
  })
    
  describe('Test when the directory doesnt exist', () => {
    beforeEach( () => {
      try {
        if (fs.existsSync(`${ingester.getIngestedDataFileFolderPath()}`)) {
          fs.rmSync( `${ingester.getIngestedDataFileFolderPath()}`, { recursive: true })
        }
      } catch (err) {
        console.log(`In beforeEach deletion of [${ingester.getIngestedDataFileFolderPath()}] failed`, err)
      }
    })

    afterEach( () => {
      try {
        if (fs.existsSync(`${ingester.getIngestedDataFileFolderPath()}`)) {
          fs.rmSync( `${ingester.getIngestedDataFileFolderPath()}`, { recursive: true })
        }
      } catch (err) {
        console.log(`In afterEach deletion of [${ingester.getIngestedDataFileFolderPath()}] failed`, err)
      }
    })

    it('createDir shall create the directory when it doesnt exist', () => {
      // Test de la presence du directory
      expect(fs.existsSync(`${ingester.getIngestedDataFileFolderPath()}`)).toBe(false)
      ingester.createDir()
      // Test de la presence du directory
      expect(fs.existsSync(`${ingester.getIngestedDataFileFolderPath()}`)).toBe(true)
    })
  })

  describe('Tests about the downloaded file',  () => {
    beforeEach( () => { // Nous aurons besoins du directory local disponible pour les tests suivants
      ingester.createDir() 
    })

    afterEach( () => {  // Cleanup du directory local
      try {
        fs.rmSync( `${ingester.getIngestedDataFileFolderPath()}`, { recursive: true })
      } catch (err) {
        console.log(`in afterEach deletion of [${ingester.getIngestedDataFilePath()}] failed`, err)
      }
    })

    it('Test if the file was downloaded', async () => {
      //expect(ingester.download).not.toThrow(Error);
      /*
      await expect(async () => {
        await ingester.download()
        // Test de la presence du fichier à ingest dans sa destination
        expect(fs.existsSync(`${ingester.getIngestedDataFilePath()}`)).toBe(true)
        // Test if the file isnt empty
        expect(fs.readFileSync(`${ingester.getIngestedDataFilePath()}`, { encoding: 'utf8', flag: 'r' }).length == 0 ).toBe(false)
        // Test if the file contains "404 error" as text
        expect(fs.readFileSync(`${ingester.getIngestedDataFilePath()}`, { encoding: 'utf8', flag: 'r' }) == "404 error" ).toBe(false)

      }).not.toThrow();
      */
      await ingester.download()
      // Test de la presence du fichier à ingest dans sa destination
      expect(fs.existsSync(`${ingester.getIngestedDataFilePath()}`)).toBe(true)
      // Test if the file isnt empty
      expect(fs.readFileSync(`${ingester.getIngestedDataFilePath()}`, { encoding: 'utf8', flag: 'r' }).length == 0 ).toBe(false)
      // Test if the file contains "404 error" as text
      expect(fs.readFileSync(`${ingester.getIngestedDataFilePath()}`, { encoding: 'utf8', flag: 'r' }) == "404 error" ).toBe(false)
      
    }, 600 * SECONDS) // set timeout of that specific test, increased from default 5 seconds, to 600 seconds
  })
})
