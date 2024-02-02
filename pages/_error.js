import Head from 'next/head';

const Error = ({ statusCode }) => {
  return (
    <>
      <Head>
        <title>Multiplayr - Error - Home of Esports</title>
      </Head>

      <body className="body-500">
        <section className="error-wrapper">
          <div className="error_icon">
            {' '}
            <i className="icon-500"></i>{' '}
          </div>
          <div className="text-center">
            <h2 className="purple-bg">Something went wrong</h2>
          </div>
          <p>Why not try refreshing your page? or you can contact </p>
          <a href="#">support@multiplayr.gg</a>

          <p>
            {' '}
            <a href="/dashboard">Go back to home </a>
          </p>
        </section>
      </body>
    </>
  );
};

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
