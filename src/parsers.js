import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const format = {
  json: 'json',
  yml: 'yml',
  yaml: 'yaml',
};

const parse = (filepath1, filepath2) => {
  const formatFile1 = path.extname(filepath1).toLowerCase().slice(1);
  const formatFile2 = path.extname(filepath2).toLowerCase().slice(1);

  if (_.has(format, formatFile1) === false || _.has(format, formatFile2) === false) {
    throw new Error('Incorrect file extension, expected .json/.yml/.yaml');
  }

  const dataFile1 = fs.readFileSync(filepath1, 'utf-8');
  const dataFile2 = fs.readFileSync(filepath2, 'utf-8');

  const isFormat1Json = formatFile1 === format.json;
  const isFormat2Json = formatFile2 === format.json;
  const isFormat1Yml = formatFile1 === format.yml || formatFile1 === format.yaml;
  const isFormat2Yml = formatFile2 === format.yml || formatFile2 === format.yaml;

  if (isFormat1Json && isFormat2Json) {
    return [JSON.parse(dataFile1), JSON.parse(dataFile2)];
  }
  if (isFormat1Yml && isFormat2Yml) {
    return [yaml.load(dataFile1), yaml.load(dataFile2)];
  }
  return isFormat1Json
    ? [JSON.parse(dataFile1), yaml.load(dataFile2)] : [yaml.load(dataFile1), JSON.parse(dataFile2)];
};

export default parse;
