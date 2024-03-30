

import '../styles/globals.css';
import "../styles/loader.css";
import "../styles/uikit.css";

import App from 'next/app';
import { DefaultSeo } from 'next-seo';
import { QueryClient, QueryClientProvider } from 'react-query';

import axios from 'axios';
import baseURL from '@utils/baseURL';

import { Hydrate } from 'react-query/hydration';
import { ReactQueryDevtools } from 'react-query/devtools';
import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import * as gtag from '../lib/gtag';
import { parseCookies, destroyCookie } from 'nookies';
import { redirectUser } from '@utils/auth';
import Script from 'next/script';
import { getCookieValue, setCookieValue } from '@utils/helpers';
import { DataProvider } from '@store/GlobalState';
import { ChatProvider } from '../components/chats/ChatProvider';

import { SpinnerProvider } from '@components/common/SpinnerContext';
import Layout from '@components/layout';
import { BlockchainProvider } from '../context/BlockchainContext';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [queryClient] = useState(() => new QueryClient());
  const supportedChainIds = [1, 3, 4, 42, 80001];

  const connectors = {
    injected: {}
    // magic: {
    //   apiKey: 'pk_...', // Your magic api key
    //   chainId: 1, // The chain ID you want to allow on magic
    // },
    // walletconnect: {},
    // walletlink: {
    //   appName: 'web3-auth',
    //   url: 'http://localhost:3000',
    //   darkMode: false,
    // },
  };

  /**
   * Customise these values to match your site
   * Read more here: https://github.com/garmeeh/next-seo#default-seo-configuration
   */
  const SEOSettings = {
    // openGraph: {
    //   type: 'website',
    //   locale: locale.appLanguage,
    //   url: 'https://www.url.ie/',
    //   site_name: 'SiteName'
    // },
    // twitter: {
    //   handle: '@handle',
    //   site: '@site',
    //   cardType: 'summary_large_image'
    // }
  };

  useEffect(() => {
    if (!getCookieValue('g-theme')) {
      setCookieValue('g-theme', 'LIGHT', 2147483647, '/');
    }
  }, []);

  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Script id="my-script1"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script  id="my-script1"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `
        }}
      />

      <DefaultSeo {...SEOSettings} />

      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <DataProvider>
            <ToastContainer />
            <ChatProvider>
              {/* <BlockchainProvider> */}
                <SpinnerProvider>
                  <Component {...pageProps} />
                </SpinnerProvider>
              {/* </BlockchainProvider>  */}
            </ChatProvider>
          </DataProvider>

          <ReactQueryDevtools />
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}

MyApp.getInitialProps = async ({ ctx }) => {
  const { token } = parseCookies(ctx);
  let pageProps = {};

  const protectedRoutes = [
    '/dashboard',
    '/notifications',
    '/posts',
    '/posts/new',
    '/posts/edit/[id]',
    '/messages',
    '/discover',
    '/games',
    '/checkout',
    '/tournament/create',
    '/tournament/[tournamentid]',
    '/team/create',
    '/matches',
    '/ranking',
    '/settings',
    '/[username]'
  ];

  try {
    const isProtected = protectedRoutes.includes(ctx.pathname);

    const availableForEveryone =
      ctx.pathname === '/login' ||
      ctx.pathname === '/confirm' ||
      ctx.pathname === '/legal/terms' ||
      ctx.pathname === '/legal/privacy' ||
      ctx.pathname === '/search' ||
      ctx.pathname === '/announcements';

    // If user is not logged in
    if (!token) {
      destroyCookie(ctx, 'token');
      // Redirect to login if user is trying to access protected routes
      isProtected && redirectUser(ctx, '/login');
    } else {
      try {
        const res = await axios.get(`${baseURL}/api/auth`, {
          headers: { Authorization: token }
        });

        const { user, profile, teams } = res.data;
        pageProps.user = user;
        pageProps.profile = profile;
        pageProps.teams = teams;
      } catch (err) {
        console.log('Error in Protected routes.....');
        destroyCookie(ctx, 'token');
        redirectUser(ctx, '/login');
      }
    }

    return {
      pageProps
    };
  } catch (error) {
    console.warn('Could not fetch common page data');

    // Fallback values
    return {
      pageProps
    };
  }
};

export default MyApp;
