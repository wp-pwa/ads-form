import gql from 'graphql-tag';

export default (apolloClient, user) =>
  apolloClient
    .query({
      query: gql`
      query {
        allSites(
          ${
            user.role !== 'ADMIN'
              ? `
                  filter: {
                    users_some: {
                      id: "${user.id}"
                    }
                  }
                `
              : ''
          }
          orderBy: url_ASC
        ) {
          id
          siteId
          url
        }
      }
    `,
    })
    .then(({ data }) => ({ sites: data.allSites }))
    .catch(() => 
      // Fail gracefully
       ({ sites: [] })
    );
