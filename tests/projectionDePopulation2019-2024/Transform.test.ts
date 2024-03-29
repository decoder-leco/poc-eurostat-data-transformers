import * as projection from "../../src/projectionDePopulation2019-2024"
import { handleDirs } from "../../src/projectionDePopulation2019-2024/handleDir"
import * as fs from 'node:fs'


jest.mock('../../src/projectionDePopulation2019-2024/handleDir', () => ({
  handleDirs: jest.fn(),
}))

const transform = new projection.Transform("./tests/projectionDePopulation2019-2024/test-transform.csv", "transformed.cvs")

describe('Testing - projectionDePopulation2019-2024 Ingestion', () => {
  afterAll(()=>{
    jest.restoreAllMocks();
    fs.rmSync('transformed.cvs')
  })

  describe('handleDirs', () => {
    it('mkDirSync shall create a new dir if requiered', async () => {
      await transform.run() 

      // TEST PASS WITH toHaveBeenCalledTimes(1)
      // TEST FAIL WITH toHaveBeenCalledTimes(2)
      expect(handleDirs).toHaveBeenCalledTimes(1)
      expect(fs.existsSync('transformed.cvs')).toBe(true);
    })
  })
})

