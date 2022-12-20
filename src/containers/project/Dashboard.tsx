import React, { FunctionComponent } from 'react';
import { Boards, Files, Drawings } from '@prisma/client';

import DashboardColumn from './DashboardColumn';

interface DashboardProps {
    projectName: string;
    projectDesc: string;
    boardsData: Boards[];
    filesData: Files[];
    drawingsData: Drawings[];
}

const Dashboard: FunctionComponent<DashboardProps> = (props: DashboardProps) => {
    const { projectName, projectDesc, boardsData, filesData, drawingsData } = props;

    return (
        <div className='flex flex-col w-full h-full gap-6 p-6 text-secondary-grey'>
            <h1 className='text-2xl text-secondary-purple'>
                {projectName}
            </h1>

            <p>
                {projectDesc}
            </p>

            <DashboardColumn
                type='board'
                data={boardsData}
            />

            <DashboardColumn
                type='file'
                data={filesData}
            />

            <DashboardColumn
                type='drawing'
                data={drawingsData}
            />
        </div>
    );
};

export default Dashboard;
