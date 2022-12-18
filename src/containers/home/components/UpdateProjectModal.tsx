import React, { FunctionComponent, useState, useRef } from 'react';
import { Project } from '@prisma/client';

import { trpc } from 'utils/trpc';

import { Close } from 'assets/icons';

import useDetectClickOutside from 'hooks/useDetectClickOutside';

import Spinner from 'components/Spinner';

interface UpdateProjectModalProps {
    isOpen: boolean;
    selectedProject: Project
    closeModalHandler: (state: boolean) => void;
}

const UpdateProjectModal: FunctionComponent<UpdateProjectModalProps> = (props: UpdateProjectModalProps) => {
    const { isOpen, selectedProject, closeModalHandler } = props;

    const { id, name: selectedName, desc: selectedDesc } = selectedProject;

    const utils = trpc.useContext();

    const { mutate, isLoading, error } = trpc.project.updateProject.useMutation({
        onSuccess: () => {
            closeModalHandler(false);
            utils.project.getAll.invalidate();
        },
    });

    const [name, setName] = useState(selectedName);
    const [desc, setDesc] = useState(selectedDesc);

    const ref = useRef<HTMLDivElement>(null);

    useDetectClickOutside(ref, closeModalHandler);

    const updateClickHandler = () => {
        mutate({
            id,
            name,
            desc,
        });
    };

    if (!isOpen) return null;

    return (
        <div className='fixed top-0 left-0 flex items-center justify-center w-screen h-screen bg-black/[40%]'>
            <div ref={ref} className='p-4 rounded-md w-[40%] h-fit bg-primary-light flex flex-col gap-4 text-secondary-grey'>
                <div className='flex justify-between'>
                    <p>
                        Update
                        {' '}
                        <span className='text-accent-yellow'>{selectedName}</span>
                    </p>

                    <button
                        onClick={() => closeModalHandler(false)}
                        className='group'
                    >
                        <Close className='transition-colors duration-150 group-hover:text-white' />
                    </button>
                </div>

                <div className='flex flex-col gap-2'>
                    <p>
                        Project name
                    </p>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className='p-2 bg-transparent border rounded-md outline-none border-line'
                    />
                </div>

                <div className='flex flex-col gap-2'>
                    <p>
                        Project description
                    </p>
                    <input
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                        className='p-2 bg-transparent border rounded-md outline-none border-line'
                    />
                </div>

                {error && <p className='text-red-800'>{error.shape?.frontEndMessage}</p>}

                <div className='flex justify-end'>
                    <button
                        onClick={updateClickHandler}
                        className='p-2 px-4 text-white transition-colors duration-150 rounded-md w-fit bg-button-grey hover:bg-button-grey-hover'
                    >
                        {isLoading ? (
                            <div className='w-[40px] h-[40px]'>
                                <Spinner />
                            </div>
                        ) : (
                            <p>Update</p>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpdateProjectModal;
