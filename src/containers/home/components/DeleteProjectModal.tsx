import React, { FunctionComponent, useRef } from 'react';

import { trpc } from 'utils/trpc';

import useDetectClickOutside from 'hooks/useDetectClickOutside';

import { Close } from 'assets/icons';

import Spinner from 'components/Spinner';

interface DeleteProjectModalProps {
    projectId: string;
    isOpen: boolean;
    closeModalHandler: (state: boolean) => void;
}

const DeleteProjectModal: FunctionComponent<DeleteProjectModalProps> = (props: DeleteProjectModalProps) => {
    const { projectId, isOpen, closeModalHandler } = props;

    const utils = trpc.useContext();

    const { mutate, isLoading, error } = trpc.project.deleteProject.useMutation({
        onSuccess: () => {
            closeModalHandler(false);
            utils.project.getAll.invalidate();
        },
    });

    const ref = useRef<HTMLDivElement>(null);

    useDetectClickOutside(ref, closeModalHandler);

    const confirmClickHandler = () => {
        mutate({
            id: projectId,
        });
    };

    if (!isOpen) return null;

    return (
        <div className='fixed top-0 left-0 flex items-center justify-center w-screen h-screen bg-black/[40%]'>
            <div ref={ref} className='p-4 rounded-md w-[40%] h-fit bg-primary-light flex flex-col gap-4 text-secondary-grey'>
                <div className='flex justify-between'>
                    <p>Are you sure you want to delete this project?</p>

                    <button
                        onClick={() => closeModalHandler(false)}
                        className='group'
                    >
                        <Close className='transition-colors duration-150 group-hover:text-white' />
                    </button>
                </div>

                {error && <p className='text-red-800'>{error.shape?.frontEndMessage}</p>}

                <div className='flex justify-start gap-4'>
                    <button
                        onClick={confirmClickHandler}
                        className='p-2 px-4 transition-colors duration-150 rounded-md text-accent-green w-fit bg-button-grey hover:bg-button-grey-hover'
                    >
                        <p>Confirm</p>
                    </button>

                    <button
                        onClick={() => closeModalHandler(false)}
                        className='p-2 px-4 transition-colors duration-150 rounded-md text-accent-yellow w-fit bg-button-grey hover:bg-button-grey-hover'
                    >
                        <p>Cancel</p>
                    </button>

                    {isLoading && (
                        <div className='w-[40px] h-[40px]'>
                            <Spinner />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DeleteProjectModal;
