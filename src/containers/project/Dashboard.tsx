import React, { FunctionComponent } from 'react';
import { Boards } from '@prisma/client';

import DashboardColumn from './DashboardColumn';

interface DashboardProps {
    projectName: string;
    projectDesc: string;
    boardsData: Boards[];
}

const Dashboard: FunctionComponent<DashboardProps> = (props: DashboardProps) => {
    const { projectName, projectDesc, boardsData } = props;

    return (
        <div className='flex flex-col w-full h-full gap-6 p-6 text-secondary-grey'>
            <h1 className='text-2xl text-secondary-purple'>
                {projectName}
            </h1>

            <p>
                {projectDesc}
            </p>

            <DashboardColumn
                label='Boards'
                data={boardsData}
            />

            <DashboardColumn
                label='Files'
                data={[]}
            />

            <DashboardColumn
                label='Drawings'
                data={[]}
            />
        </div>
    );
};

export default Dashboard;
