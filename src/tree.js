import _ from 'lodash';

const createDiff = (data1, data2) => {
  const keys = _.union(Object.keys(data1), Object.keys(data2));
  const sortedKeys = _.sortBy(keys);

  return sortedKeys.map((key) => {
    if (!_.has(data1, key)) {
      return { key, value: data2[key], status: 'added' };
    }
    if (!_.has(data2, key)) {
      return { key, value: data1[key], status: 'deleted' };
    }
    if (_.isObject(data2[key]) && _.isObject(data1[key])) {
      return { key, status: 'nested', children: createDiff(data1[key], data2[key]) };
    }
    if (_.isEqual(data2[key], data1[key])) {
      return { key, value: data1[key], status: 'unchanged' };
    }
    return {
      key, value: data2[key], oldValue: data1[key], status: 'changed',
    };
  });
};

export default createDiff;
