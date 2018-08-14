import { flatten } from 'lodash';
import { types } from './types';

export const toNumber = value => Number(value);
export const toArray = text => text.replace(/\s+/g, '').split(',');

export const toPosition = ({ position, rules: { item: itemRules } }) => {
  const items = itemRules.map(({ type }) => type);

  let type = 'customPostType';

  if (items.some(item => types.list.items.includes(item))) type = 'list';
  if (items.some(item => types.single.items.includes(item))) type = 'single';
  if (items.some(item => types.media.items.includes(item))) type = 'media';

  return {
    position,
    type,
    items,
  };
};

export const toRule = ({ position, items }) => ({
  position,
  rules: { item: items.map(type => ({ type })) },
});

export const postLoadFormat = ({ ads = { fills: [] }, slots = [] }) => {
  const adsByName = ads.fills.reduce((byName, ad) => {
    byName[ad.name] = { ...ad };
    return byName;
  }, {});

  const adNames = ads.fills.map(({ name }) => name);

  const dividedSlots = slots.reduce(
    (divided, slot) =>
      divided.concat(
        slot.names.map(name => {
          const { names: _, ...rest } = slot;
          return { names: [name], ...rest };
        }),
      ),
    [],
  );

  const slotsByAdName = {};
  const noAdSlots = [];

  dividedSlots.forEach(slot => {
    const [name] = slot.names;
    if (adNames.includes(name)) {
      slotsByAdName[name] = slotsByAdName[name] || [];
      slotsByAdName[name].push(slot);
    } else {
      noAdSlots.push(slot);
    }
  });

  Object.entries(slotsByAdName).forEach(([adName, adSlots]) => {
    // Remove names from slot definitions
    adsByName[adName].positions = adSlots.map(toPosition);
  });

  return { ads: { fills: Object.values(adsByName) }, slots: noAdSlots };
};

export const preSaveFormat = (values, originalValues) => {
  const { ads, slots } = values;
  const { ads: __ads, slots: __slots, ...others } = originalValues;

  const adSlots = flatten(
    ads.fills.map(({ name, positions = [] }) =>
      // Insert ad names into slot definitions
      positions.map(toRule).map(({ rules, position }) => ({
        names: [name],
        position,
        rules,
      })),
    ),
  );

  return {
    ads: { fills: ads.fills.map(({ positions, ...rest }) => ({ ...rest })) },
    slots: slots.concat(adSlots),
    ...others,
  };
};
