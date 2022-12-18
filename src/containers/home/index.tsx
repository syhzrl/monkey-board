import React, { FunctionComponent, useState } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';

import CreateProjectCard from './components/CreateProjectCard';

import ProjectCard from './components/ProjectCard';

interface Project {
    name: string;
    desc: string;
}

const HomeScreen: FunctionComponent = () => {
    const [projectData, setProjectData] = useState<Project[]>([
        {
            name: 'Project 1',
            desc: 'lorem ipsum yada yada yada',
        }, {
            name: 'Project 2',
            desc: 'lorem ipsum yada yada yada',
        },
    ]);

    const [parent] = useAutoAnimate<HTMLDivElement>();

    const addProjectHandler = () => {
        setProjectData(prev => {
            return [
                ...prev,
                {
                    name: 'Project 3',
                    desc: 'lorem ipsum yada yada yada',
                },
            ];
        });
    };

    return (
        <div className='flex flex-col items-center flex-1'>
            <p className='mt-4 text-3xl'>
                Monkey Board
            </p>

            <div className='flex flex-wrap items-center justify-center flex-1 w-full p-4'>
                <div ref={parent} className='grid content-center justify-center grid-cols-3 gap-10 p-4 w-fit place-items-center'>
                    {projectData.map((item) => {
                        const { name, desc } = item;

                        return (
                            <ProjectCard
                                key={name}
                                name={name}
                                desc={desc}
                            />
                        );
                    })}

                    <CreateProjectCard onClick={addProjectHandler} />
                </div>
            </div>
        </div>
    );
};

export default HomeScreen;
