import React, { FunctionComponent } from 'react';
import { Boards, Files, Drawings } from '@prisma/client';
import { useRouter } from 'next/router';

import { Caret } from 'assets/icons';

import FolderButton from './FolderButton';

interface SideMenuProps {
    projectName: string;
    boardsData: Boards[];
    filesData: Files[];
    drawingsData: Drawings[];
}

const SideMenu: FunctionComponent<SideMenuProps> = (props: SideMenuProps) => {
    const { projectName, boardsData, filesData, drawingsData } = props;

    const router = useRouter();

    const { projectId = '' } = router.query as { projectId: string };

    return (
        <div className='flex flex-col items-center w-[15%] sticky top-0 h-screen border-r border-r-line'>
            <button
                onClick={() => router.push({ pathname: `/project/${projectId}` })}
                className='flex items-center w-full gap-2 p-2 px-4 border-b border-b-line h-fit'
            >
                <Caret
                    height={12}
                    width={12}
                />

                <p>
                    {projectName}
                </p>
            </button>

            <FolderButton
                folderLabel='Boards'
                files={boardsData}
            />

            <FolderButton
                folderLabel='Files'
                files={filesData}
            />

            <FolderButton
                folderLabel='Drawings'
                files={drawingsData}
            />
        </div>
    );
};

export default SideMenu;
