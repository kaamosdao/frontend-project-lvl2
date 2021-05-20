import _ from 'lodash';

const checkValue = (value, depth) => {
  if (!_.isObject(value)) {
    return value;
  }

  const sortedValue = _(value).toPairs().sortBy(0).value();
  const values = sortedValue.map((data) => {
    const [currentKey, currentValue] = data;
    return `${' '.repeat(depth + 6)}  ${currentKey}: ${checkValue(currentValue, depth + 4)}`;
  });
  return `{\n${values.join('\n')}\n${' '.repeat(depth + 4)}}`;
};

const makeStylish = (data) => {
  const createPattern = (currentData, depth) => {
    const result = currentData.map((item) => {
      switch (item.status) {
        case 'deleted':
          return `${' '.repeat(depth + 2)}- ${item.key}: ${checkValue(item.value, depth)}`;
        case 'added':
          return `${' '.repeat(depth + 2)}+ ${item.key}: ${checkValue(item.value, depth)}`;
        case 'changed':
          return `${' '.repeat(depth + 2)}- ${item.key}: ${checkValue(item.oldValue, depth)}\n${' '.repeat(depth + 2)}+ ${item.key}: ${checkValue(item.value, depth)}`;
        case 'nested':
          return `${' '.repeat(depth + 2)}  ${item.key}: {\n${createPattern(item.children, depth + 4)}\n${' '.repeat(depth + 4)}}`;
        default:
          return `${' '.repeat(depth + 2)}  ${item.key}: ${checkValue(item.value, depth)}`;
      }
    });
    return result.join('\n');
  };

  return `{\n${createPattern(data, 0)}\n}`;
};

export default makeStylish;
