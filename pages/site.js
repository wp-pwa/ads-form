const Site = ({ id }) => <div> Site {id}</div>;

Site.getInitialProps = ({ query }) => ({ id: query.id });

export default Site;
