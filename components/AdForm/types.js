import { range } from 'lodash';

const MIN_LIMIT_VALUE = 300; // This must be equal to this: https://github.com/frontity/saturn-theme/blob/dev/src/shared/components/HtmlToReactConverter/injectSlots.js#L6

export const positions = {
  list: [
    // 'before item 1',
    'before post 1',
    ...range(1, 31).map(n => `after post ${n}`),
    // ...range(1, 21).map(n => `after item ${n}`)
    'before footer',
    'after footer',
  ],
  single: [
    // 'before item 1',
    'before content',
    ...range(1, 17).map(
      n => `after ${MIN_LIMIT_VALUE * n} characters in content`,
    ),
    'after content',
    // ...range(1, 21).map(n => `after item ${n}`)
  ],
  media: [
    // 'before item 1',
    'before image',
    'after image',
    // 'after item 1',
    // 'before footer',
  ],
};

export const types = {
  list: {
    items: ['latest', 'category', 'tag'],
    positions: positions.list,
  },
  single: {
    items: ['post', 'page'],
    positions: positions.single,
  },
  media: {
    items: ['media'],
    positions: positions.media,
  },
  customPostType: {
    positions: positions.single,
  },
};
