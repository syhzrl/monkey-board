import React from 'react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import Head from 'next/head';

import TabsProvider from 'contexts/Tabs';
import ItemCRUDProvider from 'contexts/ItemCRUD';
import SideMenuProvider from 'contexts/SideMenu';

import TopBar from 'components/TopBar';
import SideMenu from 'components/SideMenu';

import { trpc } from '../utils/trpc';

import 'globals.css';

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
    const router = useRouter();
    return (
        <>
            <Head>
                <title>Monkey Board</title>
                <meta name='description' content='Monkey Board' />
                <link rel='icon' href='/port-icon.ico' />
            </Head>
            <TabsProvider>
                <ItemCRUDProvider>
                    <SideMenuProvider>
                        <div className='flex flex-1'>
                            {router.pathname !== '/' && <SideMenu />}
                            <div className='flex flex-col flex-1'>
                                {router.pathname !== '/' && <TopBar />}
                                <Component {...pageProps} />
                            </div>
                        </div>
                    </SideMenuProvider>
                </ItemCRUDProvider>
            </TabsProvider>
        </>
    );
};

export default trpc.withTRPC(App);
