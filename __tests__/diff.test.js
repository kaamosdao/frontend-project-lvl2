import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const filepathJson1 = getFixturePath('file1.json');
const filepathJson2 = getFixturePath('file2.json');

const filepathYml1 = getFixturePath('file1.yml');
const filepathYml2 = getFixturePath('file2.yml');

const resultStylish = readFile('result_stylish.txt');
const resultPlain = readFile('result_plain.txt');
const resultJson = readFile('result_json.txt');

describe('files comparison', () => {
  test('different files stylish comparison', () => {
    expect(genDiff(filepathJson1, filepathJson2, 'stylish')).toEqual(resultStylish);
    expect(genDiff(filepathYml1, filepathYml2, 'stylish')).toEqual(resultStylish);
  });

  test('different files plain comparison', () => {
    expect(genDiff(filepathJson1, filepathJson2, 'plain')).toEqual(resultPlain);
    expect(genDiff(filepathYml1, filepathYml2, 'plain')).toEqual(resultPlain);
  });

  test('different files json comparison', () => {
    expect(genDiff(filepathJson1, filepathJson2, 'json')).toEqual(resultJson);
    expect(genDiff(filepathYml1, filepathYml2, 'json')).toEqual(resultJson);
  });
});

describe('Errors', () => {
  test('throw Error with incorrect format', () => {
    expect(() => {
      genDiff(filepathJson1, filepathJson2, 'text');
    }).toThrow('unknown text format');
  });
});
