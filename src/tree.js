import _ from 'lodash';

const createDiff = (initialData, changedData) => {
  const keys = _.union(_.keys(initialData), _.keys(changedData));
  const sortedKeys = _.sortBy(keys);

  return sortedKeys.map((key) => {
    const hasKeyInitialData = _.has(initialData, key);
    const hasKeyChangedData = _.has(changedData, key);

    if (!hasKeyInitialData) {
      return { key, value: changedData[key], status: 'added' };
    }
    if (!hasKeyChangedData) {
      return { key, value: initialData[key], status: 'deleted' };
    }
    if (_.isObject(changedData[key]) && _.isObject(initialData[key])) {
      return { key, status: 'nested', children: createDiff(initialData[key], changedData[key]) };
    }
    if (changedData[key] === initialData[key]) {
      return { key, value: initialData[key], status: 'unchanged' };
    }
    return {
      key, value: changedData[key], oldValue: initialData[key], status: 'changed',
    };
  });
};

export default createDiff;
