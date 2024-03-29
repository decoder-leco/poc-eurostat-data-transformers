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

// const mockMkDir = handleDirs("./rawDataTest")
// const mkdirSpy = jest.spyOn(, 'handleDirs').mockImplementation( () => mockMkDir )