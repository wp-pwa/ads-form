import { fromEvent } from 'graphcool-lib';

function getUserSites(api, id, userId) {
  const query = `
    query GetUserSites($id: ID!, $user_id: ID!) {
      allSites (
        filter:{
        id: $id
          users_some: {
            id: $user_id
          }
        }
      ) {
        id
      }
    }
  `;

  return api.request(query, { id, userId });
}

export default async event => {
  try {
    const api = fromEvent(event).api('simple/v1');
    const data = getUserSites(api, event.data);

    return { data: { value: !!data.allSites.length } };
  } catch (error) {
    return { error: `something went wrong: ${error}` };
  }
};
