import * as projection from "../../src/projectionDePopulation2019-2024"
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
  afterAll(()=>{
    jest.restoreAllMocks();
  })

  beforeEach(() => {
    //jest.restoreAllMocks();
    try {
      fs.mkdirSync( testDir )
    } catch (err) {
      console.log(`in beforeEach creation of ${testDir} failed`, err)
    }
  })

  it('createDir shall not create the directory when it allready exist', async () => {
    // Test de la presence du directory
    expect(fs.existsSync(testDir)).toBe(true)

    const result = DecoderLecoGithubDataIngester.createDir() 
    expect(result).toEqual('directory allready exist')
    expect(fs.existsSync(testDir)).toBe(true)
  })
})

