import { DEFAULT_OPTIONS } from '../constants.ts';
/**
 * Easy re-use of merging with default options
 * @param {Object} opts user options
 * @returns user options merged over default options
 */
const mergeWithDefaultOptions = (opts = {}) => Object.assign({}, DEFAULT_OPTIONS, opts);

export default mergeWithDefaultOptions;
