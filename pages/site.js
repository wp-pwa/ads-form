import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import getSite from '../lib/getSite';
import AdForm from '../components/AdForm';

const Site = ({ site, settingId, initialValues }) =>
  site ? (
    <Container>
      <Header>
        <Url>{site.url}</Url>
        <SiteId>{site.siteId}</SiteId>
      </Header>
      <AdForm id={settingId} initialValues={initialValues} />
    </Container>
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
  settingId: PropTypes.string.isRequired,
  initialValues: PropTypes.shape({
    ads: PropTypes.shape({}).isRequired,
  }).isRequired,
};

Site.getInitialProps = async ({ query: { id }, apolloClient }) => {
  const { site } = await getSite(apolloClient, id);
  const [saturnThemeSettings] = site.settings.filter(
    ({ package: p }) => p.name === 'saturn-theme',
  );

  const { id: settingId, value: initialValues } = saturnThemeSettings;
  return { site, settingId, initialValues };
};

export default Site;

const Container = styled.div`
  max-width: 512px;
`;

const Header = styled.div`
  width: 100%;
  margin-top: 15px;
  display: flex;
`;

const Url = styled.span`
  color: rgb(51, 51, 51);
  font-family: sans-serif;
  font-size: 1rem;
  font-weight: 800;
  padding: 0px 15px;
  margin: 0px;
`;

const SiteId = styled.span`
  color: rgb(102, 102, 102);
  font-family: sans-serif;
  font-size: 0.8rem;
  font-weight: 500;
`;
