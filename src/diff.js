import parse from './parsers.js';
import createDiff from './tree.js';
import selectFormatter from './formatter/index.js';

const genDiff = (filepath1, filepath2, format) => {
  const [initialData, changedData] = parse(filepath1, filepath2);
  const comparedData = createDiff(initialData, changedData);
  if (comparedData.length === 0) {
    return 'empty files';
  }
  return selectFormatter(comparedData, format);
};

export default genDiff;
