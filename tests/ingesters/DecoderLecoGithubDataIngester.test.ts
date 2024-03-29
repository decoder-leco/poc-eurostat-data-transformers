import * as projection from "../../src/ingesters"
import * as fs from 'node:fs'

const testDir = "data/csv/"
const testCsv = "deces_ireland.csv"
const DecoderLecoGithubDataIngester = 
  new projection.DecoderLecoGithubDataIngester("main/", testDir+"/"+testCsv)

describe('Testing - projectionDePopulation2019-2024 DecoderLecoGithubDataIngesterion', () => {

  describe('Test when the directory allready exist', () => {
    beforeEach(  () => {
      try {
        fs.mkdirSync( testDir, { recursive: true} )
      } catch (err) {
        console.log(`in beforeEach creation of ${testDir} failed`, err)
      }
    })

    afterEach( () => {
      try {
        fs.rmdirSync( testDir.split("/")[0], { recursive: true })
      } catch (err) {
        console.log(`in afterEach creation of ${testDir} failed`, err)
      }
    })

    it('createDir shall not create the directory when it allready exist', () => {
      // Test de la presence du directory
      expect(fs.existsSync(testDir)).toBe(true)

      const result = DecoderLecoGithubDataIngester.createDir() 
      // Test de la reponse de createDir()
      expect(result).toEqual(`directory ${testDir} allready exist`)
      // Test de la presence du diretory créé
      expect(fs.existsSync(testDir)).toBe(true)
    })
  })
    
  describe('Test when the directory doesnt exist', () => {
    beforeEach( () => {
      try {
        fs.rmdirSync( testDir.split("/")[0], { recursive: true })
      } catch (err) {
        console.log(`in afterEach creation of ${testDir} failed`, err)
      }
    })

    afterEach( () => {
      try {
        fs.rmdirSync( testDir.split("/")[0], { recursive: true })
      } catch (err) {
        console.log(`in afterEach creation of ${testDir} failed`, err)
      }
    })

    it('createDir shall create the directory when it doesnt exist', () => {
      // Test de la presence du directory
      expect(fs.existsSync(testDir)).toBe(false)

      // Test de la presence du retour de l'appel createDir()
      const result = DecoderLecoGithubDataIngester.createDir() 
      expect(result).toEqual(`directory ${testDir} created`)
      // Test de la presence du directory
      expect(fs.existsSync(testDir)).toBe(true)
    })
  })

  describe('Tests about the downloaded file',  () => {
    beforeEach( () => { // Nous aurons besoins du directory local disponible pour les tests suivants
      DecoderLecoGithubDataIngester.createDir() 
    })

    afterEach( () => {  // Cleanup du directory local
      try {
        fs.rmdirSync( testDir.split("/")[0], { recursive: true })
      } catch (err) {
        console.log(`in afterEach creation of ${testDir} failed`, err)
      }
    })

    it('Test if the file has been download', async () => {
      const result = await DecoderLecoGithubDataIngester.download()
      
      // Test de la reponse de download
      expect(result).toEqual(`File ${testDir}/deces_ireland.csv has succesfully been download `)
      // Test de la presence du fichier à ingest dans sa destination
      expect(fs.existsSync(testDir+"/"+testCsv)).toBe(true)
      // Test if the file isnt empty
      expect(fs.readFileSync(testDir+"/"+testCsv, { encoding: 'utf8', flag: 'r' }).length == 0 ).toBe(false)
      // Test if the file containt "404 error" as text
      expect(fs.readFileSync(testDir+"/"+testCsv, { encoding: 'utf8', flag: 'r' }) == "404 error" ).toBe(false)
    })
  })
})
