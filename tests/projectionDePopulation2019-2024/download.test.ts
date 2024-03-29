import { download } from '../../src/projectionDePopulation2019-2024/download'
import * as fs from 'node:fs'

describe('download file', () => {
  afterAll(()=>{
    fs.rmSync('test-file.tmp')
  })

  it('should write a file', async () => {
    const result = await download('nothing', 'test-file.tmp');

    expect(result).toEqual('file downloaded');
    expect(fs.existsSync('test-file.tmp')).toBe(true);
  });
});