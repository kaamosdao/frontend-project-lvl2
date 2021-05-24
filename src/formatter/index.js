import makeStylish from './stylish.js';
import makePlain from './plain.js';

const formatters = {
  stylish: makeStylish,
  plain: makePlain,
  json: JSON.stringify,
};

const formatData = (data, format) => {
  if (!(format in formatters)) {
    throw new Error(`unknown ${format} format`);
  }
  return formatters[format](data);
};

export default formatData;
