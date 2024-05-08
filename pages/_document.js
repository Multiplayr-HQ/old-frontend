import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
// import Loader from '@components/common/loader';

import React,{useContext} from 'react';

import themeOptions from '@components/theme/theme-options';
// import Script from 'next/script';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const path = require('path');
    const { readdirSync, readFileSync, lstatSync } = require('fs');

    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    const { req: request = {} } = ctx;
    const { cookies = {} } = request || {};
    const initialProps = await Document.getInitialProps(ctx);

    

    /* Colors */
    const themeBaseDirPath = path.join(
      process.cwd(),
      '/public/assets/css/dash'
    );
    let themeMap = {};
    if (lstatSync(themeBaseDirPath).isDirectory()) {
      const themeDirs = readdirSync(themeBaseDirPath);
      for (const fi of themeDirs) {
        const fileName = fi.replace(/_([^-]*)-[^.]*\.css$/g, '$1');
        themeMap[fileName] = readFileSync(`${themeBaseDirPath}/${fi}`, 'utf8');
      }

      global.themeCss = themeMap;
    }
    // const {loader}=()=>{
    //   const { loader } = useContext(DataContext);
    //   return {loader};

    // }


    return {
      ...initialProps,
      theme: cookies['g-theme'],
      themeMap,
    };

    try {
      const { theme, themeMap } = this.props;
      const themeFileName = themeOptions[theme] || themeOptions.LIGHT;
      const themeCss = themeMap ? themeMap[themeFileName] : '';

      ctx.renderPage = () =>
        originalRenderPage({
          // eslint-disable-next-line react/display-name
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />)
        });

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        )
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    const { theme, themeMap} = this.props;
    const themeFileName = themeOptions[theme] || themeOptions.LIGHT;
    const themeCss = themeMap ? themeMap[themeFileName] : '';

    
    // /* eslint-disable react/no-danger, jam3/no-sanitizer-with-danger */
    return (
      <Html>
        <Head>
          <link rel="canonical" href="https://multiplayr.gg/" />
          <link rel="shortcut icon" href="/assets/media/logos/icon.png" />

          <link
            href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&family=Rubik:wght@300;400;500;600;700&display=swap"
            rel="stylesheet"
          />

          <link
            rel="stylesheet"
            href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
          />

          <link
            href="/assets/css/dash/bootstrap.css"
            rel="stylesheet"
            type="text/css"
          />

          <link
            href="/assets/css/dash/layout.css"
            rel="stylesheet"
            type="text/css"
          />
          <link
            href="/assets/css/dash/dark-layout.css"
            rel="stylesheet"
            type="text/css"
          />
          <link
            href="/assets/css/dash/screen.css"
            rel="stylesheet"
            type="text/css"
          />

          <link
            href="/assets/css/dash/jquery.mCustomScrollbar.css"
            rel="stylesheet"
            type="text/css"
          />

          <link
            href="/assets/css/dash/jquery.fancybox.css"
            rel="stylesheet"
            type="text/css"
          />
          <link
            href="/assets/css/dash/jquery.fancybox-buttons.css"
            rel="stylesheet"
            type="text/css"
          />

          <link
            href="/assets/css/dash/slick.css"
            rel="stylesheet"
            type="text/css"
          />
          <link href="/assets/css/error.css" rel="stylesheet" type="text/css" />

          <script
            async
            src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"
          ></script>
          <script async src="/assets/js/dash/bootstrap.bundle.min.js" />
          <script async src="/assets/js/dash/jquery.mCustomScrollbar.js" />
          <script async src="/assets/js/dash/slick.js" />
          <script async src="/assets/js/dash/jquery.fancybox.js" />
          <script async src="/assets/js/dash/jquery.fancybox-media.js" />
          <script async src="/assets/js/dash/pixelarity-faceless.js" />
          <script
            async
            src={`https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}`}
          ></script>
          <link
            href="/assets/css/dash/pixelarity.css"
            rel="stylesheet"
            type="text/css"
          />

          <style></style>
        </Head>
        <body className="DarkPage">
          
          {themeCss ? (
            <style
              dangerouslySetInnerHTML={{
                __html: `${themeCss} `
              }}
            />
          ) : null}
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
