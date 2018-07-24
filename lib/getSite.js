import gql from 'graphql-tag';

export default (apolloClient, id) => {
  const query = gql`
    query {
      Site(
        id: "${id}"
      ) {
        siteId
        url
        settings {
          package {
            name
          }
          value
        }
      }
    }
  `;

  return apolloClient
    .query({ query })
    .then(({ data }) => ({ site: data.Site }))
    .catch(() => ({}));
};
