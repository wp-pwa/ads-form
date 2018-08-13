import { range } from 'lodash';

const MIN_LIMIT_VALUE = 300; // This must be equal to this: https://github.com/frontity/saturn-theme/blob/dev/src/shared/components/HtmlToReactConverter/injectSlots.js#L6

export const listPositions = [
  // 'before item 1',
  'before post 1',
  ...range(1, 21).map(n => `after post ${n}`),
  // ...range(1, 21).map(n => `after item ${n}`)
  'before footer',
  'after footer',
];

export const singlePositions = [
  // 'before item 1',
  'before content',
  ...range(1, 11).map(
    n => `after ${MIN_LIMIT_VALUE * n} characters in content`,
  ),
  'after content',
  // ...range(1, 21).map(n => `after item ${n}`)
];

export const mediaPositions = [
  // 'before item 1',
  'before image',
  'after image',
  // 'after item 1',
  // 'before footer',
];

export default {
  list: {
    items: ['latest', 'category', 'tag'],
    positions: listPositions,
  },
  single: {
    items: ['post', 'page'],
    positions: singlePositions,
  },
  media: {
    items: ['media'],
    positions: mediaPositions,
  },
  customPostType: {
    positions: singlePositions,
  },
};
