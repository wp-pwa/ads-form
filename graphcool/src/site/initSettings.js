import { fromEvent } from 'graphcool-lib';

async function getSaturnPackage(api) {
  const query = `
    query {
      allPackages(
        filter: {
          name: "saturn-theme"
        }
      ) {
        id
      }
    }
  `;

  return api.request(query);
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
    const {
      allPackages: [{ id: packageId }],
    } = await getSaturnPackage(api);
    const response = await createSetting(api, siteId, packageId);
    return { data: event.data, siteId, packageId, response };
  } catch (error) {
    return { data: event.data, error: `something went wrong: ${error}` };
  }
};
