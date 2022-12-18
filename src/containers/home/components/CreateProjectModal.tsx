import React, { FunctionComponent, useState, useEffect, useRef } from 'react';
import { nanoid } from 'nanoid';

import { trpc } from 'utils/trpc';

import { Close } from 'assets/icons';

import Spinner from 'components/Spinner';

interface CreateProjectModalProps {
    isOpen: boolean;
    closeModalHandler: (state: boolean) => void;
}

const CreateProjectModal: FunctionComponent<CreateProjectModalProps> = (props: CreateProjectModalProps) => {
    const { isOpen, closeModalHandler } = props;

    const utils = trpc.useContext();

    const { mutate, isLoading, error } = trpc.project.createProject.useMutation({
        onSuccess: () => {
            closeModalHandler(false);
            utils.project.getAll.invalidate();
        },
    });

    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClick = (event: Event) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                closeModalHandler(false);
            }
        };

        const hideDropdownKeyboardHandler = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                event.preventDefault();
                closeModalHandler(false);
            }
        };

        document.addEventListener('click', handleClick, true);
        document.addEventListener('keydown', hideDropdownKeyboardHandler, true);

        return () => {
            document.removeEventListener('click', handleClick, true);
            document.addEventListener('keydown', hideDropdownKeyboardHandler, true);
        };
    }, [ref, closeModalHandler]);

    const createClickHandler = () => {
        mutate({
            id: nanoid(),
            name,
            desc,
        });
    };

    if (!isOpen) return null;

    return (
        <div className='fixed top-0 left-0 flex items-center justify-center w-screen h-screen bg-black/[40%]'>
            <div ref={ref} className='p-4 rounded-md w-[40%] h-fit bg-primary-light flex flex-col gap-4 text-secondary-grey'>
                <div className='flex justify-between'>
                    <p>Create a new project</p>

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
                        onClick={createClickHandler}
                        className='p-2 px-4 text-white transition-colors duration-150 rounded-md w-fit bg-button-grey hover:bg-button-grey-hover'
                    >
                        {isLoading ? (
                            <div className='w-[40px] h-[40px]'>
                                <Spinner />
                            </div>
                        ) : (
                            <p>Create</p>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateProjectModal;
