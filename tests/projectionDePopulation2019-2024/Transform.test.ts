import * as projection from "../../src/projectionDePopulation2019-2024"
import { createDirs } from "../../src/projectionDePopulation2019-2024/createDir"
import * as fs from 'node:fs'


jest.mock('../../src/projectionDePopulation2019-2024/createDir', () => ({
  createDirs: jest.fn(),
}))

const transform = new projection.Transform("./tests/projectionDePopulation2019-2024/test-transform.csv", "transformed.cvs")

describe('Testing - projectionDePopulation2019-2024 Ingestion', () => {
  afterAll(()=>{
    jest.restoreAllMocks();
    fs.rmSync('transformed.cvs')
  })

  describe('createDirs', () => {
    it('mkDirSync shall create a new dir if requiered', async () => {
      await transform.run() 

      // TEST PASS WITH toHaveBeenCalledTimes(1)
      // TEST FAIL WITH toHaveBeenCalledTimes(2)
      expect(createDirs).toHaveBeenCalledTimes(1)
      expect(fs.existsSync('transformed.cvs')).toBe(true);
    })
  })
})

