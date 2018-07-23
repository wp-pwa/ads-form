import gql from 'graphql-tag'

export default apolloClient => (
  apolloClient.query({
    query: gql`
      query getUser {
        user {
          id
          name
          role
        }
      }
    `
  }).then(({ data }) => {
    return { loggedInUser: data }
  }).catch(() => {
    // Fail gracefully
    return { loggedInUser: {} }
  })
)
