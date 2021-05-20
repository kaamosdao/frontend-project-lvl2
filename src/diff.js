import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import createDiff from './tree.js';
import formatData from './formatter/index.js';

const getData = (filePath) => {
  const formatFile = path.extname(filePath).toLowerCase().slice(1);
  const dataFile = fs.readFileSync(filePath, 'utf-8');
  return parse(dataFile, formatFile);
};

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const initialData = getData(filepath1);
  const changedData = getData(filepath2);
  const comparedData = createDiff(initialData, changedData);

  return formatData(comparedData, format);
};

export default genDiff;
