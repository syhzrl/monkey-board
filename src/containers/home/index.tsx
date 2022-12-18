import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import autoAnimate from '@formkit/auto-animate';

import { trpc } from 'utils/trpc';

import Spinner from 'components/Spinner';

import CreateProjectCard from './components/CreateProjectCard';
import ProjectCard from './components/ProjectCard';
import CreateProjectModal from './components/CreateProjectModal';
import DeleteProjectModal from './components/DeleteProjectModal';

const HomeScreen: FunctionComponent = () => {
    const { data, isLoading, error } = trpc.project.getAll.useQuery();

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedProjectId, setselectedProjectId] = useState('');

    const parent = useRef(null);

    useEffect(() => {
        if (parent.current) {
            autoAnimate(parent.current);
        }
    }, [parent]);

    const deleteProjectCardClickHandler = (projId: string) => {
        setselectedProjectId(projId);
        setIsDeleteModalOpen(true);
    };

    const renderProjectData = () => {
        if (isLoading) {
            return (
                <div className='flex items-center justify-center w-full h-full'>
                    <div className='w-[300px] h-[300px]'>
                        <Spinner />
                    </div>
                </div>
            );
        }

        if (error) {
            return (
                <div className='flex items-center justify-center w-full h-full'>
                    <p>
                        {error.message}
                    </p>
                </div>
            );
        }

        return (
            <div ref={parent} className='grid content-center justify-center grid-cols-3 gap-10 p-4 w-fit place-items-center'>
                {data.map((item) => {
                    const { id, name, desc } = item;

                    return (
                        <ProjectCard
                            key={id}
                            id={id}
                            name={name}
                            desc={desc}
                            deleteClickHandler={deleteProjectCardClickHandler}
                        />
                    );
                })}

                <CreateProjectCard
                    onClick={() => setIsCreateModalOpen(true)}
                />
            </div>
        );
    };

    return (
        <div className='relative flex flex-col items-center flex-1'>
            <p className='mt-4 text-3xl'>
                Monkey Board
            </p>

            <div className='flex flex-wrap items-center justify-center flex-1 w-full p-4'>
                {renderProjectData()}
            </div>

            <CreateProjectModal
                isOpen={isCreateModalOpen}
                closeModalHandler={() => setIsCreateModalOpen(false)}
            />
            <DeleteProjectModal
                isOpen={isDeleteModalOpen}
                projectId={selectedProjectId}
                closeModalHandler={() => setIsDeleteModalOpen(false)}
            />
        </div>
    );
};

export default HomeScreen;
