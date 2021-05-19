import _ from 'lodash';

const checkValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (_.isBoolean(value) || _.isNull(value) || _.isNumber(value)) {
    return value;
  }
  return `'${value}'`;
};

const makePlain = (data) => {
  const createPattern = (currentData, acc) => {
    const result = currentData.map((item) => {
      const path = `${acc}.${item.key}`;
      if (item.status === 'deleted') {
        return `Property '${path.slice(1)}' was removed`;
      }
      if (item.status === 'added') {
        return `Property '${path.slice(1)}' was added with value: ${checkValue(item.value)}`;
      }
      if (item.status === 'changed') {
        return `Property '${path.slice(1)}' was updated. From ${checkValue(item.oldValue)} to ${checkValue(item.value)}`;
      }
      if (item.status === 'nested') {
        return createPattern(item.children, path);
      }
      return 'unchanged';
    });
    return result.filter((item) => item !== 'unchanged').join('\n');
  };

  return createPattern(data, '');
};

export default makePlain;
