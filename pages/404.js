import Head from 'next/head';

const Error = ({ statusCode }) => {
  return (
    <>
      <Head>
        <title>Multiplayr - 404 Error - Home of Esports</title>
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
          <p>400 ERROR - Why not try refreshing your page? or you can contact </p>
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

export default Error;
