import parse from './parsers.js';
import createDiff from './tree.js';
import makeStylish from './formatter/stylish.js';

const genDiff = (filepath1, filepath2, format) => {
  const [initialData, changedData] = parse(filepath1, filepath2);
  const comparedData = createDiff(initialData, changedData);
  if (format !== 'stylish') {
    throw new Error('unknown output format');
  }
  return makeStylish(comparedData);
};

export default genDiff;
