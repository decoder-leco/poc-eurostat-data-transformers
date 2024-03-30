import * as transformers from "../../src/transformers"
import * as fs from 'node:fs'

/*
const video = require('./video');

test('plays video', () => {
  const spy = jest.spyOn(video, 'play');
  const isPlaying = video.play();

  expect(spy).toHaveBeenCalled();
  expect(isPlaying).toBe(true);

  spy.mockReset();
  spy.mockRestore();
});
*/
const testTransformedDataFilePath = `./transformedData.csv`
const testSourceDataFilePath = `./tests/transformers/test-transform.csv`
const transformer = new transformers.DecoderLecoGithubDataTransformer(testSourceDataFilePath, testTransformedDataFilePath)

// let person = new Person('Lorem', 'Ipsum');
// let spy = jest.spyOn(transformer, 'createDir').mockImplementation(() => 'Hello');
const createDirSpy = jest.spyOn(transformer, 'createDir') // does not compile if the create method is private

const expectedTransformedData = "DATAFLOW,LAST UPDATE,time,freq,unit,sex,projection,age,population_proj\n"+
                          "ESTAT:PROJ_19NP(1.0),20/07/20 23:00:00,2019,A,PER,F,BSL,Y1,\n"+
                          "ESTAT:PROJ_19NP(1.0),20/07/20 23:00:00,2020,A,PER,F,BSL,Y1,\n"+
                          "ESTAT:PROJ_19NP(1.0),20/07/20 23:00:00,2021,A,PER,F,BSL,Y1,\n"+
                          "ESTAT:PROJ_19NP(1.0),20/07/20 23:00:00,2022,A,PER,F,BSL,Y1,\n"+
                          "ESTAT:PROJ_19NP(1.0),20/07/20 23:00:00,2023,A,PER,F,BSL,Y1,\n"+
                          "ESTAT:PROJ_19NP(1.0),20/07/20 23:00:00,2024,A,PER,F,BSL,Y1,\n"+
                          "ESTAT:PROJ_19NP(1.0),20/07/20 23:00:00,2025,A,PER,F,BSL,Y1,\n"+
                          "ESTAT:PROJ_19NP(1.0),20/07/20 23:00:00,2019,A,PER,F,BSL,Y1,\n"+
                          "ESTAT:PROJ_19NP(1.0),20/07/20 23:00:00,2020,A,PER,F,BSL,Y1,\n"
                          
describe('Testing - DecoderLecoGithubDataTransformer', () => {
  afterAll(()=>{
    jest.restoreAllMocks();
    fs.rmSync('transformedData.csv')
  })

  describe('Test the run() method', () => {
    it('shall create the ', async () => {
      await transformer.run()
      expect(createDirSpy).toHaveBeenCalledTimes(1);
      expect(fs.existsSync('transformedData.csv')).toBe(true);
    })
  })
})