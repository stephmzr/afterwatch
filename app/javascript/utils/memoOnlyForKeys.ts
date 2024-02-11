/* eslint-disable consistent-return */

import isEqual from 'lodash/isEqual';

/* Return true if props change */
const memoOnlyForKeys = (keys: string[]): any => (prev: any, next: any): boolean => !keys.some(key => !isEqual(prev[key], next[key]));

export default memoOnlyForKeys;