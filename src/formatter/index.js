import makeStylish from './stylish.js';
import makePlain from './plain.js';
import makeJson from './json.js';

const formatters = {
  stylish: makeStylish,
  plain: makePlain,
  json: makeJson,
};

const formatData = (data, format) => {
  if (!(format in formatters)) {
    throw new Error(`unknown ${format} format`);
  }
  return formatters[format](data);
};

export default formatData;
