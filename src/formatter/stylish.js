import _ from 'lodash';

const stringify = (value, depth) => {
  if (!_.isObject(value)) {
    return value;
  }
  const keys = Object.keys(value);
  const sortedKeys = _.sortBy(keys);
  const result = sortedKeys.map((key) => `${' '.repeat(depth + 6)}  ${key}: ${stringify(value[key], depth + 4)}`);
  return `{\n${result.join('\n')}\n${' '.repeat(depth + 4)}}`;
};

const repeat = (depth, number) => `${' '.repeat(depth + number)}`;

const makeStylish = (data) => {
  const createPattern = (currentData, depth) => {
    const result = currentData.map((item) => {
      switch (item.status) {
        case 'deleted':
          return `${repeat(depth, 2)}- ${item.key}: ${stringify(item.value, depth)}`;
        case 'added':
          return `${repeat(depth, 2)}+ ${item.key}: ${stringify(item.value, depth)}`;
        case 'changed':
          return `${repeat(depth, 2)}- ${item.key}: ${stringify(item.oldValue, depth)}\n${repeat(depth, 2)}+ ${item.key}: ${stringify(item.value, depth)}`;
        case 'nested':
          return `${repeat(depth, 2)}  ${item.key}: {\n${createPattern(item.children, depth + 4)}\n${repeat(depth, 4)}}`;
        default:
          return `${repeat(depth, 2)}  ${item.key}: ${stringify(item.value, depth)}`;
      }
    });
    return result.join('\n');
  };

  return `{\n${createPattern(data, 0)}\n}`;
};

export default makeStylish;
