import * as projectionDePopulation from "../../src/projectionDePopulation2019-2024"

const ingest = new projectionDePopulation.Ingest("./lol","./test")

test('adds 1 + 2 to equal 3', () => {
  expect(ingest.addition(1, 2)).toBe(3);
});

describe("fonction d'addition", () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(ingest.addition(1, 2)).toBe(3);
  });
})