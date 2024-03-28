import * as projection from "../../src/projectionDePopulation2019-2024"
//import { mkdirSync, existsSync } from "node:fs"
// import * as fs from "node:fs"
import { handleDirs } from "../../src/projectionDePopulation2019-2024/handleDir"
import { download } from "../../src/projectionDePopulation2019-2024/download"

// const ingest = new projection.Ingest("test", "lol")

/*
describe("fonction d'addition", () => {
  it("shall add two entries & return their sum", async () => {
    await addition(1,2)

    expect(ingest.addition).toHaveBeenCalledTimes(1)
    expect(ingest.addition).toHaveBeenCalledWith(1,2)
  })
})
*/


/*
describe("Testing - projectionDePopulation2019-2024 Ingestion", () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(ingest.addition(1, 2)).toBe(3);
  });
  it('should accept a payload and call the review dal with it', async () => {
    expect(ingest.addition(1, 2)).toBe(3);
  })
})
*/


/* from https://jestjs.io/fr/docs/next/jest-object#jestspyonobject-methodname

const video = require('./video');

afterEach(() => {
  // restaure l'espion créé avec spyOn
  jest.restoreAllMocks();
});

test('lit la vidéo', () => {
  const spy = jest.spyOn(video, 'play');
  const isPlaying = video.play();

  expect(spy).toHaveBeenCalled();
  expect(isPlaying).toBe(true);
});
*/


/*
afterEach(() => {
  // restaure l'espion créé avec spyOn
  jest.restoreAllMocks();
})

test('lit la vidéo', () => {
  const spy = jest.spyOn(fs, 'mkdirSync')
  const mkdir = fs.mkdirSync('./rawDataTest')
  expect(spy).toHaveBeenCalled()
  expect(mkdir).toBe(true)
})
*/


jest.mock('../../src/projectionDePopulation2019-2024/handleDir', () => ({
  handleDirs: jest.fn(() => console.log('mocking handleDirs')),
}))

jest.mock('../../src/projectionDePopulation2019-2024/download', () => ({
  download: jest.fn(() => console.log('mocking download')),
}))


const ingest = new projection.Ingest("test", "./lol/test.cvs")

// const mockMkDir = handleDirs("./rawDataTest")
// const mkdirSpy = jest.spyOn(, 'handleDirs').mockImplementation( () => mockMkDir )

describe('Testing - projectionDePopulation2019-2024 Ingestion', () => {
  afterAll(()=>{
    jest.restoreAllMocks();
  })

  describe('handleDirs', () => {
    it('mkDirSync shall create a new dir if requiered', async () => {
      await ingest.run() 

      // TEST PASS WITH toHaveBeenCalledTimes(1)
      // TEST FAIL WITH toHaveBeenCalledTimes(2)
      expect(handleDirs).toHaveBeenCalledTimes(1)
    })
  describe('download', () => {
    it('mkDirSync shall create a new dir if requiered', async () => {
      await ingest.run() 

      // TEST PASS WITH toHaveBeenCalledTimes(1)
      // TEST FAIL WITH toHaveBeenCalledTimes(2)
      expect(download).toHaveBeenCalledTimes(1)
    })
  })
})

