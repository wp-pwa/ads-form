import { flatten } from 'lodash';

const listTypes = ['latest', 'category', 'tag'];
const singleTypes = ['post', 'page', 'media'];

export const postLoadFormat = ({ ads, slots = [] }) => {
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
    adsByName[adName].positions = adSlots.map(({ rules, position }) => {
      const items = rules.item ? rules.item.map(({ type }) => type) : [];

      let type = 'custom';

      if (items.some(item => listTypes.includes(item))) type = 'list';
      if (items.some(item => singleTypes.includes(item))) type = 'single';

      return { type, items, position };
    });
  });

  console.log({ adsByName });

  return { ads: { fills: Object.values(adsByName) }, slots: noAdSlots };
};

export const preSaveFormat = (values, originalValues) => {
  const { ads, slots } = values;
  const { ads: __ads, slots: __slots, ...others } = originalValues;

  const adSlots = flatten(
    ads.fills.map(({ name, positions }) =>
      positions.map(({ items, position }) => ({
        position,
        names: [name],
        rules: {
          item: (items instanceof Array
            ? items
            : items.replace(/\s+/g, '').split(',')
          ).map(type => ({ type })),
        },
      })),
    ),
  );

  return {
    ads: { fills: ads.fills.map(({ positions, ...rest }) => ({ ...rest })) },
    slots: slots.concat(adSlots),
    ...others,
  };
};
