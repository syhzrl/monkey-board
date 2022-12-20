import React, { FunctionComponent, useContext, useEffect, useState } from 'react';
import { Boards, Files, Drawings } from '@prisma/client';
import { useRouter } from 'next/router';

import { trpc } from 'utils/trpc';

import SideMenu from 'components/SideMenu';
import LoadingModal from 'components/LoadingModal';

import { ItemCRUDContext } from 'contexts/ItemCRUD';
import { SelectedItemContext } from 'contexts/SelectedItem';

import Board from './Board';
import Dashboard from './Dashboard';
import File from './File';
import Draw from './Draw';
import CreateItemModal from './CreateItemModal';

const ProjectDetailsScreen: FunctionComponent = () => {
    const router = useRouter();

    const {
        projectId = '',
        selectedItemId = '',
        selectedItemType = '',
    } = router.query as {
        projectId: string,
        selectedItemId: string,
        selectedItemType: string
    };

    const { data, isLoading, isError, error } = trpc.project.getProjectDetails.useQuery({ id: projectId });

    const { isCreateModalOpen, setIsCreateModalOpen, setCurrentProjectDetailsId } = useContext(ItemCRUDContext);
    const { selectedItem, setSelectedItem } = useContext(SelectedItemContext);

    const [projectName, setProjectName] = useState('Project Name');
    const [projectDesc, setProjectDesc] = useState('Project Description');

    const [boardsData, setBoardsData] = useState<Boards[]>([]);
    const [filesData, setFilesData] = useState<Files[]>([]);
    const [drawingsData, setDrawingsData] = useState<Drawings[]>([]);

    useEffect(() => {
        if (selectedItemId && selectedItemType) {
            setSelectedItem({
                id: selectedItemId,
                type: selectedItemType,
            });
        } else {
            setSelectedItem({
                id: '',
                type: '',
            });
        }
    }, [selectedItemId, selectedItemType, setSelectedItem]);

    useEffect(() => {
        if (data) {
            const { id, name, desc, boards, files, drawings } = data;

            setCurrentProjectDetailsId(id);
            setProjectName(name);
            setProjectDesc(desc);
            setBoardsData(boards);
            setDrawingsData(drawings);
            setFilesData(files);
        }
    }, [data, setCurrentProjectDetailsId, setBoardsData, setDrawingsData, setFilesData]);

    const renderPageContent = () => {
        const { type } = selectedItem;

        switch (type) {
            case 'board': return <Board />;
            case 'file': return <File />;
            case 'drawing': return <Draw />;
            default: return (
                <Dashboard
                    projectName={projectName}
                    projectDesc={projectDesc}
                    boardsData={boardsData}
                    filesData={filesData}
                    drawingsData={drawingsData}
                />
            );
        }
    };

    return (
        <div className='flex w-full'>
            <SideMenu
                projectName={projectName}
                boardsData={boardsData}
                filesData={filesData}
                drawingsData={drawingsData}
            />

            {renderPageContent()}

            <CreateItemModal
                isOpen={isCreateModalOpen}
                closeModalHandler={setIsCreateModalOpen}
            />

            <LoadingModal
                isOpen={isLoading}
                isError={isError}
                error={error?.shape?.frontEndMessage || ''}
            />
        </div>
    );
};

export default ProjectDetailsScreen;
