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
const ingest = new projection.Ingest("test", testDir+"/test.cvs")

describe('Testing - projectionDePopulation2019-2024 Ingestion', () => {
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

    // 
    const result = ingest.createDir() 
    expect(result).toEqual('directory allready exist')
    expect(fs.existsSync(testDir)).toBe(true)
  })

  it('createDir shall create a new dir if when it doesnt exist', async () => {
    // Test de la presence du diretory

    

    await ingest.run() 

    // TEST PASS WITH toHaveBeenCalledTimes(1)
    // TEST FAIL WITH toHaveBeenCalledTimes(2)
    expect(ingest.createDir()).toHaveBeenCalledTimes(1)
  })

  it('download shall fetch a remote file & copy it to the created dir', async () => {
    await ingest.run() 

    // TEST PASS WITH toHaveBeenCalledTimes(2)
    // TEST FAIL WITH toHaveBeenCalledTimes(1)
    expect(ingest.download()).toHaveBeenCalledTimes(2)
  })
})

