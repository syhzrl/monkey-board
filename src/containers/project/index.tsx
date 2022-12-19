import React, { FunctionComponent, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';

import { trpc } from 'utils/trpc';

import { TabsContext } from 'contexts/Tabs';

import SideMenu from 'components/SideMenu';
import TopBar from 'components/TopBar';
import LoadingModal from 'components/LoadingModal';

import { ItemCRUDContext } from 'contexts/ItemCRUD';
import Board from './Board';
import Dashboard from './Dashboard';
import File from './File';
import Draw from './Draw';
import CreateItemModal from './CreateItemModal';

import { ModuleType } from '../../entities/tabs';

const ProjectDetailsScreen: FunctionComponent = () => {
    const { selectedTab } = useContext(TabsContext);

    const router = useRouter();

    const { projectId = '' } = router.query as { projectId: string };

    const { data, isLoading, error } = trpc.project.getProjectDetails.useQuery({ id: projectId });

    const { isCreateModalOpen, setIsCreateModalOpen, setCurrentProjectDetailsId } = useContext(ItemCRUDContext);

    useEffect(() => {
        if (data) {
            setCurrentProjectDetailsId(data.id);
        }
    }, [data, setCurrentProjectDetailsId]);

    const renderPageContent = () => {
        switch (selectedTab.type) {
            case ModuleType.board: return <Board />;
            case ModuleType.file: return <File />;
            case ModuleType.drawing: return <Draw />;
            default: return (
                <Dashboard
                    projectName={data?.name || 'Project Name'}
                    projectDesc={data?.desc || 'Project Description'}
                    boardsData={data?.boards || []}
                />
            );
        }
    };

    return (
        <div className='flex w-full'>
            <Dashboard
                projectName={data?.name || 'Project Name'}
                projectDesc={data?.desc || 'Project Description'}
                boardsData={data?.boards || []}
            />

            <CreateItemModal
                isOpen={isCreateModalOpen}
                closeModalHandler={setIsCreateModalOpen}
            />

            {/* TODO PUT ERROR IN THIS MODAL */}
            <LoadingModal isOpen={isLoading} />
        </div>
    );
};

export default ProjectDetailsScreen;
