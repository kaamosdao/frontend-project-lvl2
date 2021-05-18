import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import genDiff from '../index.js';

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
let resultStylish;
let resultPlain;

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
  resultStylish = readFile('file1Andfile2Comparison.txt');
  resultPlain = readFile('file1Andfile2Comparison plain.txt');
});

describe('files comparison', () => {
  test('different files stylish comparison', () => {
    expect(genDiff(filepath1, filepath2, 'stylish')).toEqual(resultStylish);
    expect(genDiff(filepathYaml1, filepathYml2, 'stylish')).toEqual(resultStylish);
    expect(genDiff(filepathYml1, filepathYml2, 'stylish')).toEqual(resultStylish);
    expect(genDiff(filepathYaml1, filepathYaml2, 'stylish')).toEqual(resultStylish);
    expect(genDiff(filepathYaml1, filepath2, 'stylish')).toEqual(resultStylish);
    expect(genDiff(filepathYml1, filepath2, 'stylish')).toEqual(resultStylish);
  });

  test('empty files stylish comparison', () => {
    expect(genDiff(filepath3, filepath4, 'stylish')).toEqual('empty files');
    expect(genDiff(filepathYml3, filepathYaml4, 'stylish')).toEqual('empty files');
    expect(genDiff(filepathYaml3, filepathYaml4, 'stylish')).toEqual('empty files');
    expect(genDiff(filepath3, filepathYml4, 'stylish')).toEqual('empty files');
  });

  test('different files plain comparison', () => {
    expect(genDiff(filepath1, filepath2, 'plain')).toEqual(resultPlain);
    expect(genDiff(filepathYaml1, filepathYml2, 'plain')).toEqual(resultPlain);
    expect(genDiff(filepathYml1, filepathYml2, 'plain')).toEqual(resultPlain);
    expect(genDiff(filepathYaml1, filepathYaml2, 'plain')).toEqual(resultPlain);
    expect(genDiff(filepathYaml1, filepath2, 'plain')).toEqual(resultPlain);
    expect(genDiff(filepathYml1, filepath2, 'plain')).toEqual(resultPlain);
  });

  test('empty files plain comparison', () => {
    expect(genDiff(filepath3, filepath4, 'plain')).toEqual('empty files');
    expect(genDiff(filepathYml3, filepathYaml4, 'plain')).toEqual('empty files');
    expect(genDiff(filepathYaml3, filepathYaml4, 'plain')).toEqual('empty files');
    expect(genDiff(filepath3, filepathYml4, 'plain')).toEqual('empty files');
  });
});

describe('Errors', () => {
  test('throw Error with incorrect extension', () => {
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

  test('throw Error with incorrect format', () => {
    expect(() => {
      genDiff(filepath1, filepath2, 'text');
    }).toThrow('unknown text format');

    expect(() => {
      genDiff(filepathYaml1, filepathYml2, 'text');
    }).toThrow('unknown text format');

    expect(() => {
      genDiff(filepathYml1, filepath2, 'text');
    }).toThrow('unknown text format');
  });
});
