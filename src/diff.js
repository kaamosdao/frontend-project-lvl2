import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const getData = (filepath) => JSON.parse(fs.readFileSync(filepath));
const getExtension = (filepath) => path.parse(filepath).ext.toLocaleLowerCase();

const genDiff = (filepath1, filepath2) => {
  if (getExtension(filepath1) !== '.json' || getExtension(filepath2) !== '.json') {
    throw new Error('Incorrect file extension, expected ".json"');
  }

  const initialData = getData(filepath1);
  const changedData = getData(filepath2);

  const unitedData = { ...initialData, ...changedData };
  const sortedData = _(unitedData).toPairs().sortBy(0).value();

  const comparedData = sortedData.reduce((acc, data) => {
    const currentKey = data[0];
    const currentValue = data[1];
    const hasKeyInitialData = _.has(initialData, currentKey) === true;
    const hasKeyChangedData = _.has(changedData, currentKey) === true;

    if (hasKeyInitialData && hasKeyChangedData) {
      if (currentValue === initialData[currentKey]) {
        acc.push([`  ${currentKey}`, currentValue]);
        return acc;
      }

      acc.push([`- ${currentKey}`, initialData[currentKey]]);
      acc.push([`+ ${currentKey}`, currentValue]);
      return acc;
    }

    if (hasKeyInitialData && !hasKeyChangedData) {
      acc.push([`- ${currentKey}`, initialData[currentKey]]);
      return acc;
    }

    acc.push([`+ ${currentKey}`, currentValue]);
    return acc;
  }, []);

  const result = _.fromPairs(comparedData);
  const formattedData = JSON.stringify(result, null, '  ');

  return formattedData.replace(/['",]/g, '');
};

export default genDiff;
