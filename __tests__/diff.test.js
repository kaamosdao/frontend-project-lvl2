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
const filepath3 = getFixturePath('file3.json');
const filepath4 = getFixturePath('file4.json');

const filepathYaml1 = getFixturePath('file1.yaml');
const filepathYaml2 = getFixturePath('file2.yaml');
const filepathYaml3 = getFixturePath('file3.yaml');
const filepathYaml4 = getFixturePath('file4.yaml');

const filepathYml1 = getFixturePath('file1.yml');
const filepathYml2 = getFixturePath('file2.yml');
const filepathYml3 = getFixturePath('file3.yml');
const filepathYml4 = getFixturePath('file4.yml');

const filepathWrong = getFixturePath('wrongExtension.txt');
const resultStylish = readFile('file1Andfile2Comparison.txt');
const resultPlain = readFile('file1Andfile2Comparison plain.txt');
const resultJson = readFile('file1Andfile2Comparison json.txt');

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

  test('different files json comparison', () => {
    expect(genDiff(filepath1, filepath2, 'json')).toEqual(resultJson);
    expect(genDiff(filepathYaml1, filepathYml2, 'json')).toEqual(resultJson);
    expect(genDiff(filepathYml1, filepathYml2, 'json')).toEqual(resultJson);
    expect(genDiff(filepathYaml1, filepathYaml2, 'json')).toEqual(resultJson);
    expect(genDiff(filepathYaml1, filepath2, 'json')).toEqual(resultJson);
    expect(genDiff(filepathYml1, filepath2, 'json')).toEqual(resultJson);
  });

  test('empty files json comparison', () => {
    expect(genDiff(filepath3, filepath4, 'json')).toEqual('empty files');
    expect(genDiff(filepathYml3, filepathYaml4, 'json')).toEqual('empty files');
    expect(genDiff(filepathYaml3, filepathYaml4, 'json')).toEqual('empty files');
    expect(genDiff(filepath3, filepathYml4, 'json')).toEqual('empty files');
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
