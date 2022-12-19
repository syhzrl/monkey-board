import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import autoAnimate from '@formkit/auto-animate';
import { Project } from '@prisma/client';

import { trpc } from 'utils/trpc';

import Spinner from 'components/Spinner';

import CreateProjectCard from './components/CreateProjectCard';
import ProjectCard from './components/ProjectCard';
import CreateProjectModal from './components/CreateProjectModal';
import DeleteProjectModal from './components/DeleteProjectModal';
import UpdateProjectModal from './components/UpdateProjectModal';

const HomeScreen: FunctionComponent = () => {
    const { data, isLoading, error } = trpc.project.getAll.useQuery();

    const [selectedProjectId, setselectedProjectId] = useState('');
    const [selectedProject, setSelectedProject] = useState<Project>({ id: '', name: '', desc: '' });

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

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

    const updateProjectCardClickHandler = (proj: Project) => {
        setSelectedProject(proj);
        setIsUpdateModalOpen(true);
    };

    const renderProjectData = () => {
        if (isLoading) {
            return (
                <div className='flex items-center justify-center w-full h-full'>
                    <div className='w-[150px] h-[150px]'>
                        <Spinner />
                    </div>
                </div>
            );
        }

        if (error) {
            return (
                <div className='flex items-center justify-center w-full h-full'>
                    <p>
                        {error.shape?.frontEndMessage}
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
                            updateClickHandler={updateProjectCardClickHandler}
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
        <div className='relative flex flex-col items-center flex-1 gap-2'>
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
            <UpdateProjectModal
                isOpen={isUpdateModalOpen}
                selectedProject={selectedProject}
                closeModalHandler={() => setIsUpdateModalOpen(false)}
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
