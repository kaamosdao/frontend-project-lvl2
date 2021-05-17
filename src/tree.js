import _ from 'lodash';

const createDiff = (initialData, changedData) => {
  const unitedData = { ...initialData, ...changedData };
  const sortedData = _(unitedData).toPairs().sortBy(0).value();

  return sortedData.map((data) => {
    const [currentKey, currentValue] = data;
    const hasKeyInitialData = _.has(initialData, currentKey) === true;
    const hasKeyChangedData = _.has(changedData, currentKey) === true;
    if (hasKeyInitialData && !hasKeyChangedData) {
      return {
        key: currentKey, value: currentValue, status: 'deleted',
      };
    }

    if (!hasKeyInitialData && hasKeyChangedData) {
      return {
        key: currentKey, value: currentValue, status: 'added',
      };
    }

    if (currentValue === initialData[currentKey]) {
      return {
        key: currentKey, value: currentValue, status: 'unchanged',
      };
    }

    if (_.isObject(currentValue) && _.isObject(initialData[currentKey])) {
      return {
        key: currentKey,
        status: 'nested',
        children: createDiff(initialData[currentKey], currentValue),
      };
    }

    return {
      key: currentKey,
      value: currentValue,
      oldValue: initialData[currentKey],
      status: 'changed',
    };
  });
};

export default createDiff;
