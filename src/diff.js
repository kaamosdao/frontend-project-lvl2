import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import createDiff from './tree.js';
import formatData from './formatter/index.js';

const getData = (filePath) => {
  const format = path.extname(filePath).toLowerCase().slice(1);
  const data = fs.readFileSync(filePath, 'utf-8');
  return parse(data, format);
};

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const data1 = getData(filepath1);
  const data2 = getData(filepath2);
  const comparedData = createDiff(data1, data2);

  return formatData(comparedData, format);
};

export default genDiff;
