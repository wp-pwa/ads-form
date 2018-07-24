import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import getSite from '../lib/getSite';
import AdForm from '../components/AdForm';

const Site = ({ site }) =>
  site ? (
    <Fragment>
      <h2>{site.url}</h2>
      <p>{site.siteId}</p>
      <h3>Settings</h3>
      <ul>{site.settings.map(s => <li>{s.package.name}</li>)}</ul>
      <AdForm url={site.url} />
    </Fragment>
  ) : (
    <div>The site doesn&apos;t exist</div>
  );

Site.propTypes = {
  site: PropTypes.string.isRequired,
};

Site.getInitialProps = async ({ query: { id }, apolloClient }) => {
  const { site } = await getSite(apolloClient, id);
  return { site };
};

export default Site;
