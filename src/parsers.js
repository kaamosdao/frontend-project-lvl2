import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const format = {
  json: 'json',
  yml: 'yml',
  yaml: 'yaml',
};

const parse = (filepath) => {
  const formatFile = path.extname(filepath).toLowerCase().slice(1);

  if (_.has(format, formatFile) === false) {
    throw new Error('Incorrect file extension, expected .json/.yml/.yaml');
  }

  const dataFile = fs.readFileSync(filepath, 'utf-8');

  return formatFile === format.json ? JSON.parse(dataFile) : yaml.load(dataFile);
};

export default (filepath1, filepath2) => {
  const data1 = parse(filepath1);
  const data2 = parse(filepath2);
  return [data1, data2];
};
