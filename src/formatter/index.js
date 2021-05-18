import _ from 'lodash';
import makeStylish from './stylish.js';
import makePlain from './plain.js';

const formatters = {
  stylish: makeStylish,
  plain: makePlain,
};

const selectFormatter = (data, format) => {
  if (!_.has(formatters, format)) {
    throw new Error(`unknown ${format} format`);
  }
  return formatters[format](data);
};

export default selectFormatter;
