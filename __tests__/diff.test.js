import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import genDiff from '../src/diff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

let filepath1;
let filepath2;
let filepath3;
let filepath4;

let filepathYaml1;
let filepathYaml2;
let filepathYaml3;
let filepathYaml4;

let filepathYml1;
let filepathYml2;
let filepathYml3;
let filepathYml4;

let filepathWrong;
let result;

beforeAll(() => {
  filepath1 = getFixturePath('file1.json');
  filepath2 = getFixturePath('file2.json');
  filepath3 = getFixturePath('file3.json');
  filepath4 = getFixturePath('file4.json');

  filepathYaml1 = getFixturePath('file1.yaml');
  filepathYaml2 = getFixturePath('file2.yaml');
  filepathYaml3 = getFixturePath('file3.yaml');
  filepathYaml4 = getFixturePath('file4.yaml');

  filepathYml1 = getFixturePath('file1.yml');
  filepathYml2 = getFixturePath('file2.yml');
  filepathYml3 = getFixturePath('file3.yml');
  filepathYml4 = getFixturePath('file4.yml');

  filepathWrong = getFixturePath('wrongExtension.txt');
  result = readFile('file1Andfile2Comparison.txt');
});

describe('files comparison', () => {
  test('different files comparison', () => {
    expect(genDiff(filepath1, filepath2)).toEqual(result);
    expect(genDiff(filepathYaml1, filepathYml2)).toEqual(result);
    expect(genDiff(filepathYml1, filepathYml2)).toEqual(result);
    expect(genDiff(filepathYaml1, filepathYaml2)).toEqual(result);
    expect(genDiff(filepathYaml1, filepath2)).toEqual(result);
    expect(genDiff(filepathYml1, filepath2)).toEqual(result);
  });

  test('empty files comparison', () => {
    expect(genDiff(filepath3, filepath4)).toEqual('{}');
    expect(genDiff(filepathYml3, filepathYaml4)).toEqual('{}');
    expect(genDiff(filepathYaml3, filepathYaml4)).toEqual('{}');
    expect(genDiff(filepath3, filepathYml4)).toEqual('{}');
  });
});

test('throw Error with incorrect extention', () => {
  expect(() => {
    genDiff(filepath1, filepathWrong);
  }).toThrow('Incorrect file extension, expected .json/.yml/.yaml');

  expect(() => {
    genDiff(filepathYaml1, filepathWrong);
  }).toThrow('Incorrect file extension, expected .json/.yml/.yaml');

  expect(() => {
    genDiff(filepathWrong, filepathYml1);
  }).toThrow('Incorrect file extension, expected .json/.yml/.yaml');
});
