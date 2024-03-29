import * as projection from "../../src/ingesters"
import * as fs from 'node:fs'
//import { createDirs } from "../../src/projectionDePopulation2019-2024/createDir"
//import { download } from "../../src/projectionDePopulation2019-2024/download"

/*
jest.mock('../../src/projectionDePopulation2019-2024/createDir', () => ({
  createDirs: jest.fn(),
}))

jest.mock('../../src/projectionDePopulation2019-2024/download', () => ({
  download: jest.fn(),
}))
*/
const testDir = "./tmp"
const DecoderLecoGithubDataIngester = new projection.DecoderLecoGithubDataIngester("remote", testDir+"/test.cvs")

describe('Testing - projectionDePopulation2019-2024 DecoderLecoGithubDataIngesterion', () => {
  afterAll( ()=>{
    try {
      fs.rmdir( testDir, { recursive: true }, () => {})
    } catch (err) {
      console.log(`in afterEach creation of ${testDir} failed`, err)
    }
  })

  describe('Test when the directory allready exist', () => {
    beforeEach(  () => {
      try {
        fs.mkdirSync( testDir )
      } catch (err) {
        console.log(`in beforeEach creation of ${testDir} failed`, err)
      }
    })

    afterEach( () => {
      try {
        fs.rmdirSync( testDir, { recursive: true })
      } catch (err) {
        console.log(`in afterEach creation of ${testDir} failed`, err)
      }
    })

    afterAll( ()=>{
      try {
        fs.rmdirSync( testDir, { recursive: true })
      } catch (err) {
        console.log(`in afterEach creation of ${testDir} failed`, err)
      }
    })

    it('createDir shall not create the directory when it allready exist', () => {
      // Test de la presence du directory
      expect(fs.existsSync(testDir)).toBe(true)
      const result = DecoderLecoGithubDataIngester.createDir() 
      expect(result).toEqual(`directory ${testDir} allready exist`)
      expect(fs.existsSync(testDir)).toBe(true)
    })
  })
  
  //fs.rmdir( testDir, { recursive: true }, () => {})
  
  describe('Test when the directory doesnt exist', () => {
    beforeEach( () => {
      console.log("beforeEach")
      try {
        fs.rmdirSync( testDir, { recursive: true })
        console.log("beforeEach: ", fs.existsSync(testDir))
      } catch (err) {
        console.log(`in afterEach creation of ${testDir} failed`, err)
      }
    })

    afterEach( () => {
      try {
        fs.rmdirSync( testDir, { recursive: true })
      } catch (err) {
        console.log(`in afterEach creation of ${testDir} failed`, err)
      }
    })

    it('createDir shall create the directory when it doesnt exist', () => {
      // Test de la presence du directory
      expect(fs.existsSync(testDir)).toBe(false)
      const result = DecoderLecoGithubDataIngester.createDir() 
      expect(result).toEqual(`directory ${testDir} created`)
      expect(fs.existsSync(testDir)).toBe(true)
    })
  })
})
