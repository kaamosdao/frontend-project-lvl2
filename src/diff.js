import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const getData = (filepath) => JSON.parse(fs.readFileSync(filepath));

const isCorrectExtension = (file1, file2, ext) => {
  const fileExt1 = path.parse(file1).ext.toLocaleLowerCase();
  const fileExt2 = path.parse(file2).ext.toLocaleLowerCase();

  if (fileExt1 !== ext || fileExt2 !== ext) {
    throw new Error(`Incorrect file extension, expected ${ext}`);
  }
};

const genDiff = (filepath1, filepath2) => {
  isCorrectExtension(filepath1, filepath2, '.json');

  const initialData = getData(filepath1);
  const changedData = getData(filepath2);

  const unitedData = { ...initialData, ...changedData };
  const sortedData = _(unitedData).toPairs().sortBy(0).value();

  const comparedData = sortedData.reduce((acc, data) => {
    const [currentKey, currentValue] = data;
    const hasKeyInitialData = _.has(initialData, currentKey) === true;
    const hasKeyChangedData = _.has(changedData, currentKey) === true;

    if (hasKeyInitialData && hasKeyChangedData) {
      if (currentValue === initialData[currentKey]) {
        acc.push([`  ${currentKey}`, currentValue]);
      } else {
        acc.push([`- ${currentKey}`, initialData[currentKey]]);
        acc.push([`+ ${currentKey}`, currentValue]);
      }
    } else if (hasKeyInitialData && !hasKeyChangedData) {
      acc.push([`- ${currentKey}`, initialData[currentKey]]);
    } else {
      acc.push([`+ ${currentKey}`, currentValue]);
    }

    return acc;
  }, []);

  const formattedData = JSON.stringify(_.fromPairs(comparedData), null, '  ');

  return formattedData.replace(/['",]/g, '');
};

export default genDiff;
