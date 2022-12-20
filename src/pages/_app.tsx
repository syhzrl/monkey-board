import React from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import ItemCRUDProvider from 'contexts/ItemCRUD';
import SideMenuProvider from 'contexts/SideMenu';
import SelectedItemProvider from 'contexts/SelectedItem';
import RightClickMenuProvider from 'contexts/RightClickMenu';

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
            <SelectedItemProvider>
                <ItemCRUDProvider>
                    <RightClickMenuProvider>
                        <SideMenuProvider>
                            <Component {...pageProps} />
                        </SideMenuProvider>
                    </RightClickMenuProvider>
                </ItemCRUDProvider>
            </SelectedItemProvider>
        </>
    );
};

export default trpc.withTRPC(App);
