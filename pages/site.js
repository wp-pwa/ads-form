import React from 'react';
import PropTypes from 'prop-types';
import getSite from '../lib/getSite';
import AdForm from '../components/AdForm';
import Styles from '../components/Styles';

const Site = ({ site }) =>
  site ? (
    <Styles>
      <h2>{site.url}</h2>
      <p>{site.siteId}</p>
      <h3>Settings</h3>
      <ul>{site.settings.map(s => <li>{s.package.name}</li>)}</ul>
      <AdForm url={site.url} />
    </Styles>
  ) : (
    <div>The site doesn&apos;t exist</div>
  );

Site.propTypes = {
  site: PropTypes.shape({
    siteId: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    settings: PropTypes.arrayOf(
      PropTypes.shape({
        package: PropTypes.shape({
          name: PropTypes.string.isRequired,
        }),
        value: PropTypes.shape({}),
      }),
    ).isRequired,
  }).isRequired,
};

Site.getInitialProps = async ({ query: { id }, apolloClient }) => {
  const { site } = await getSite(apolloClient, id);
  return { site };
};

export default Site;
