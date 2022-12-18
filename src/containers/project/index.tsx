import React, { FunctionComponent, useContext } from 'react';

import { TabsContext } from 'contexts/Tabs';

import SideMenu from 'components/SideMenu';
import TopBar from 'components/TopBar';

import Board from './Board';
import Dashboard from './Dashboard';
import File from './File';
import Draw from './Draw';

import { ModuleType } from '../../entities/tabs';

const ProjectDetailsScreen: FunctionComponent = () => {
    const { selectedTab } = useContext(TabsContext);

    const renderPageContent = () => {
        switch (selectedTab.type) {
            case ModuleType.board: return <Board />;
            case ModuleType.file: return <File />;
            case ModuleType.drawing: return <Draw />;
            default: return <Dashboard />;
        }
    };

    return (
        <div className='flex'>
            <SideMenu />
            <div className='flex flex-col items-center justify-start flex-1'>
                <TopBar />
                <div className='flex items-center justify-center flex-1 w-full'>
                    {renderPageContent()}
                </div>
            </div>
        </div>
    );
};

export default ProjectDetailsScreen;
