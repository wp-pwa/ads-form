import { Fragment } from 'react';
import getSite from '../lib/getSite';

const Site = ({ site }) =>
  site ? (
    <Fragment>
      <h2>{site.url}</h2>
      <p>{site.siteId}</p>
      <h3>Settings</h3>
      <ul>
        {site.settings.map(s => <li>{s.package.name}</li>)}
      </ul>
    </Fragment>
  ) : (
    <div>The site doesn't exist</div>
  );

Site.getInitialProps = async ({ query: { id }, apolloClient }) => {
  const { site } = await getSite(apolloClient, id);
  return { site };
};

export default Site;
