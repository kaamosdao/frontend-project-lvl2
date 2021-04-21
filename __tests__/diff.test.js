import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import genDiff from '../src/diff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

describe('files comparison', () => {
  test('different files comparison', () => {
    const filepath1 = '/home/kaamosdao/frontend-project-lvl2/__fixtures__/file1.json';
    const filepath2 = '__fixtures__/file2.json';
    const result = readFile('file1Andfile2Comparison.txt');

    expect(genDiff(filepath1, filepath2)).toEqual(result);
  });

  test('empty files comparison', () => {
    const filepath3 = '/home/kaamosdao/frontend-project-lvl2/__fixtures__/file3.json';
    const filepath4 = '__fixtures__/file4.json';

    expect(genDiff(filepath3, filepath4)).toEqual('{}');
  });
});

test('throw Error with incorrect extention', () => {
  const filepath1 = '/home/kaamosdao/frontend-project-lvl2/__fixtures__/file1.jso';
  const filepath2 = '__fixtures__/file2.json';
  expect(() => {
    genDiff(filepath1, filepath2);
  }).toThrow('Incorrect file extension, expected .json');
});
