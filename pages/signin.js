/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import redirect from '../lib/redirect';
import checkLoggedIn from '../lib/checkLoggedIn';

import SigninBox from '../components/SigninBox';

export default class Signin extends React.Component {
  static async getInitialProps(context) {
    const { loggedInUser } = await checkLoggedIn(context.apolloClient);

    if (loggedInUser.user) {
      // Already signed in? No need to continue.
      // Throw them back to the main page
      redirect(context, '/');
    }

    return {};
  }

  render() {
    return (
      <Container>
        {/* SigninBox handles all login logic. */}
        <SigninBox />
        <hr />
        <p>
          New?{' '}
          <Link prefetch href="/create-account">
            <a>Create account</a>
          </Link>
        </p>
      </Container>
    );
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
