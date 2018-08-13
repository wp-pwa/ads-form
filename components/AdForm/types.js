import { range } from 'lodash';

export const listPositions = ['before post 1'].concat(
  range(1, 30).map(n => `after post ${n}`),
);

export const singlePositions = ['before paragraph 1'].concat(
  range(1, 30).map(n => `after paragraph ${n}`),
);

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
    positions: ['before image', 'after image'],
  },
  customPostType: {
    positions: singlePositions,
  },
};
