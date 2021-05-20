import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const filepath1 = getFixturePath('file1.json');
const filepath2 = getFixturePath('file2.json');

const filepathYml1 = getFixturePath('file1.yml');
const filepathYml2 = getFixturePath('file2.yml');

const resultStylish = readFile('file1Andfile2Comparison.txt');
const resultPlain = readFile('file1Andfile2Comparison plain.txt');
const resultJson = readFile('file1Andfile2Comparison json.txt');

describe('files comparison', () => {
  test('different files stylish comparison', () => {
    expect(genDiff(filepath1, filepath2, 'stylish')).toEqual(resultStylish);
    expect(genDiff(filepathYml1, filepathYml2, 'stylish')).toEqual(resultStylish);
    expect(genDiff(filepathYml1, filepath2, 'stylish')).toEqual(resultStylish);
  });

  test('different files plain comparison', () => {
    expect(genDiff(filepath1, filepath2, 'plain')).toEqual(resultPlain);
    expect(genDiff(filepathYml1, filepathYml2, 'plain')).toEqual(resultPlain);
    expect(genDiff(filepathYml1, filepath2, 'plain')).toEqual(resultPlain);
  });

  test('different files json comparison', () => {
    expect(genDiff(filepath1, filepath2, 'json')).toEqual(resultJson);
    expect(genDiff(filepathYml1, filepathYml2, 'json')).toEqual(resultJson);
    expect(genDiff(filepathYml1, filepath2, 'json')).toEqual(resultJson);
  });
});

describe('Errors', () => {
  test('throw Error with incorrect format', () => {
    expect(() => {
      genDiff(filepath1, filepath2, 'text');
    }).toThrow('unknown text format');

    expect(() => {
      genDiff(filepathYml1, filepath2, 'text');
    }).toThrow('unknown text format');
  });
});
