import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value) && !_.isNull(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return value;
};

const makePlain = (data) => {
  const createPattern = (currentData, acc) => {
    const result = currentData.map((item) => {
      const path = `${acc}.${item.key}`;
      switch (item.status) {
        case 'deleted':
          return `Property '${path.slice(1)}' was removed`;
        case 'added':
          return `Property '${path.slice(1)}' was added with value: ${stringify(item.value)}`;
        case 'changed':
          return `Property '${path.slice(1)}' was updated. From ${stringify(item.oldValue)} to ${stringify(item.value)}`;
        case 'nested':
          return createPattern(item.children, path);
        default:
          return 'unchanged';
      }
    });
    return result.filter((item) => item !== 'unchanged').join('\n');
  };

  return createPattern(data, '');
};

export default makePlain;
