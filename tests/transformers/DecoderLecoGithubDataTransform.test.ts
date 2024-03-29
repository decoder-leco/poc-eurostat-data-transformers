/*
import * as projection from "../../src/transformers"
import * as fs from 'node:fs'


jest.mock('../../src/projectionDePopulation2019-2024/createDir', () => ({
  createDirs: jest.fn(),
}))

const transform = new projection.Transform("./tests/projectionDePopulation2019-2024/test-transform.csv", "transformed.cvs")
const transformedData = "DATAFLOW,LAST UPDATE,time,freq,unit,sex,projection,age,population_proj\n"+
                          "ESTAT:PROJ_19NP(1.0),20/07/20 23:00:00,2019,A,PER,F,BSL,Y1,\n"+
                          "ESTAT:PROJ_19NP(1.0),20/07/20 23:00:00,2020,A,PER,F,BSL,Y1,\n"+
                          "ESTAT:PROJ_19NP(1.0),20/07/20 23:00:00,2021,A,PER,F,BSL,Y1,\n"+
                          "ESTAT:PROJ_19NP(1.0),20/07/20 23:00:00,2022,A,PER,F,BSL,Y1,\n"+
                          "ESTAT:PROJ_19NP(1.0),20/07/20 23:00:00,2023,A,PER,F,BSL,Y1,\n"+
                          "ESTAT:PROJ_19NP(1.0),20/07/20 23:00:00,2024,A,PER,F,BSL,Y1,\n"+
                          "ESTAT:PROJ_19NP(1.0),20/07/20 23:00:00,2025,A,PER,F,BSL,Y1,\n"+
                          "ESTAT:PROJ_19NP(1.0),20/07/20 23:00:00,2019,A,PER,F,BSL,Y1,\n"+
                          "ESTAT:PROJ_19NP(1.0),20/07/20 23:00:00,2020,A,PER,F,BSL,Y1,\n"
                          
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
      expect(transform.createDir).toHaveBeenCalledTimes(1)
      expect(fs.existsSync('transformed.cvs')).toBe(true);
    })
  })
})

*/