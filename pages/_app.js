import App, { Container } from 'next/app';
import Head from 'next/head';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import withApollo from '../lib/withApollo';

class MyApp extends App {
  render() {
    const { Component, pageProps, apolloClient } = this.props;
    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <Component {...pageProps} />
        </ApolloProvider>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </Head>
      </Container>
    );
  }
}

export default withApollo(MyApp);
