import { flatten } from 'lodash';

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
      const type = items.some(item =>
        ['home', 'tag', 'category'].includes(item),
      )
        ? 'list'
        : 'single';

      return { type, items, position };
    });
  });

  console.log({ adsByName });

  return { ads: { fills: Object.values(adsByName) }, slots: noAdSlots };
};

export const preSaveFormat = (values, originalValues) => {
  const { ads, slots } = values;
  const { ads: _ads, slots: _slots, ...others } = originalValues;

  const adSlots = flatten(
    ads.fills.map(({ name, positions }) =>
      positions.map(({ items, position }) => ({
        position,
        names: [name],
        rules: { item: items.map(type => ({ type })) },
      })),
    ),
  );

  return {
    ads: { fills: ads.fills.map(({ positions, ...rest }) => ({ ...rest })) },
    slots: slots.concat(adSlots),
    ...others,
  };
};
