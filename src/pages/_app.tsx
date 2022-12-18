import React from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import TabsProvider from 'contexts/Tabs';
import { trpc } from '../utils/trpc';

import 'globals.css';

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
    return (
        <>
            <Head>
                <title>Monkey Board</title>
                <meta name='description' content='Monkey Board' />
                <link rel='icon' href='/port-icon.ico' />
            </Head>
            <TabsProvider>
                <Component {...pageProps} />
            </TabsProvider>
        </>
    );
};

export default trpc.withTRPC(App);
