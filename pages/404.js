import Head from 'next/head';
import Link from 'next/link';

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
          <Link href="#">support@multiplayr.gg</Link>

          <p>
            {' '}
            <Link href="/login">Go back to home </Link>
          </p>
        </section>
      </body>
    </>
  );
};

export default Error;
