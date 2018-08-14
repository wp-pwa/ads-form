import { fromEvent } from 'graphcool-lib';

async function getPackageId(api, name) {
  const query = `
    query GetPackage($name: String!) {
      allPackages(
        filter: {
          name: $name
        }
      ) {
        id
      }
    }
  `;

  const {
    allPackages: [{ id: packageId }],
  } = await api.request(query, { name });

  return packageId;
}

async function createSetting(api, siteId, packageId) {
  const mutation = `
    mutation CreateSetting($siteId: ID!, $packageId: ID!) {
      createSetting(
        value: "{}"
        packageId: $packageId
        siteId: $siteId
      ) {
        id
      }
    }
  `;

  return api.request(mutation, { siteId, packageId });
}

export default async event => {
  try {
    const api = fromEvent(event).api('simple/v1');
    const { id: siteId } = event.data;

    const [themeId, connectionId] = await Promise.all([
      getPackageId(api, 'saturn-theme'),
      getPackageId(api, 'wp-org-connection'),
    ]);

    const responses = await Promise.all([
      createSetting(api, siteId, themeId),
      createSetting(api, siteId, connectionId),
    ]);

    return { data: event.data, siteId, themeId, connectionId, responses };
  } catch (error) {
    return { data: event.data, error: `something went wrong: ${error}` };
  }
};
