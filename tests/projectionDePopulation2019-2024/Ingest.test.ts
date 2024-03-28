import {Ingest} from "../../src/projectionDePopulation2019-2024"

//const ingest = new Ingest()
//ingest.init("test", "lol")

const addition = jest.spyOn(Ingest, "addition").mockImplementation((a: number, b: number) => {
  return a + b;
});

/*
test('adds 1 + 2 to equal 3', () => {
  expect(addition(1, 2)).toBe(3);
});
*/

describe("fonction d'addition", () => {
  it("shall add two entries & return their sum", async () => {
    await addition(1,2)

    expect(ingest.addition).toHaveBeenCalledTimes(1)
    expect(ingest.addition).toHaveBeenCalledWith(1,2)
  })
})

describe("Testing - projectionDePopulation2019-2024 Ingestion", () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(ingest.addition(1, 2)).toBe(3);
  });
  it('should accept a payload and call the review dal with it', async () => {
    expect(ingest.addition(1, 2)).toBe(3);
  })
})
