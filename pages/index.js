/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import cookie from 'cookie';
import { ApolloConsumer } from 'react-apollo';
import Link from 'next/link';

import redirect from '../lib/redirect';
import checkLoggedIn from '../lib/checkLoggedIn';
import getUserSites from '../lib/getUserSites';

export default class Index extends React.Component {
  static propTypes = {
    loggedInUser: PropTypes.shape({
      user: PropTypes.shape({}),
    }).isRequired,
    sites: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.isRequired,
        siteId: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
      }),
    ).isRequired,
  };

  static async getInitialProps(context) {
    const { apolloClient } = context;

    const { loggedInUser } = await checkLoggedIn(apolloClient);
    const { user } = loggedInUser;

    if (!user) {
      // If not signed in, send them somewhere more useful
      redirect(context, '/signin');
    }

    const { sites } = await getUserSites(apolloClient, user);

    return { loggedInUser, sites };
  }

  signout = apolloClient => () => {
    window.document.cookie = cookie.serialize('token', '', {
      maxAge: -1, // Expire the cookie immediately
    });

    // Force a reload of all the current queries now that the user is
    // logged in, so we don't accidentally leave any state around.
    apolloClient.cache.reset().then(() => {
      // Redirect to a more useful page when signed out
      redirect({}, '/signin');
    });
  };

  render() {
    const {
      loggedInUser: { user },
      sites,
    } = this.props;
    return (
      <ApolloConsumer>
        {client => (
          <div>
            Hello {user.name}!<br />
            <h3>Sites:</h3>
            <ul>
              {sites.map(({ url, siteId, id }) => (
                <li key={id}>
                  <Link href={{ pathname: '/site', query: { id } }}>
                    <a>{`${url} - ${siteId}`}</a>
                  </Link>
                </li>
              ))}
            </ul>
            <button onClick={this.signout(client)}>Sign out</button>
          </div>
        )}
      </ApolloConsumer>
    );
  }
}
