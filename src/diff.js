import _ from 'lodash';
import parse from './parsers.js';

const genDiff = (filepath1, filepath2) => {
  const [initialData, changedData] = parse(filepath1, filepath2);

  const unitedData = { ...initialData, ...changedData };
  const sortedData = _(unitedData).toPairs().sortBy(0).value();

  const comparedData = sortedData.reduce((acc, data) => {
    const [currentKey, currentValue] = data;
    const hasKeyInitialData = _.has(initialData, currentKey) === true;
    const hasKeyChangedData = _.has(changedData, currentKey) === true;

    if (hasKeyInitialData && !hasKeyChangedData) {
      acc.push([`- ${currentKey}`, initialData[currentKey]]);
    } else if (!hasKeyInitialData && hasKeyChangedData) {
      acc.push([`+ ${currentKey}`, currentValue]);
    } else if (currentValue === initialData[currentKey]) {
      acc.push([`  ${currentKey}`, currentValue]);
    } else {
      acc.push([`- ${currentKey}`, initialData[currentKey]]);
      acc.push([`+ ${currentKey}`, currentValue]);
    }

    return acc;
  }, []);

  const formattedData = JSON.stringify(_.fromPairs(comparedData), null, '  ');

  return formattedData.replace(/['",]/g, '');
};

export default genDiff;
