import React, { FunctionComponent, useContext, useRef, useEffect, useState } from 'react';

import { ItemCRUDContext } from 'contexts/ItemCRUD';

import { trpc } from 'utils/trpc';

import useDetectClickOutside from 'hooks/useDetectClickOutside';

import { Close } from 'assets/icons';

import Spinner from 'components/Spinner';
import { ModuleType } from '../../entities/tabs';

interface CreateItemModalProps {
    isOpen: boolean;
    closeModalHandler: (state: boolean) => void;
}

const CreateItemModal: FunctionComponent<CreateItemModalProps> = (props: CreateItemModalProps) => {
    const { isOpen, closeModalHandler } = props;

    const { selectedItemType, currentProjectDetailsId } = useContext(ItemCRUDContext);

    const [itemName, setItemName] = useState('');

    const [modalLabel, setModalLabel] = useState('');

    useEffect(() => {
        switch (selectedItemType) {
            case ModuleType.board: setModalLabel('Board'); break;
            case ModuleType.file: setModalLabel('File'); break;
            case ModuleType.drawing: setModalLabel('Drawing'); break;
            default: setModalLabel(''); break;
        }
    }, [selectedItemType]);

    const utils = trpc.useContext();

    const { mutate: createBoard, isLoading, error } = trpc.boards.createBoard.useMutation({
        onSuccess: () => {
            closeModalHandler(false);
            utils.project.getProjectDetails.invalidate();
        },
    });

    const ref = useRef<HTMLDivElement>(null);

    useDetectClickOutside(ref, closeModalHandler);

    const confirmClickHandler = () => {
        createBoard({
            projectDetailsId: currentProjectDetailsId,
            name: itemName,
        });
    };

    if (!isOpen) return null;

    return (
        <div className='fixed top-0 left-0 flex items-center justify-center w-screen h-screen bg-black/[40%]'>
            <div ref={ref} className='p-4 rounded-md w-[40%] h-fit bg-primary-light flex flex-col gap-4 text-secondary-grey'>
                <div className='flex justify-between'>
                    <p>{`Create ${modalLabel}`}</p>

                    <button
                        onClick={() => closeModalHandler(false)}
                        className='group'
                    >
                        <Close className='transition-colors duration-150 group-hover:text-white' />
                    </button>
                </div>

                <div className='flex flex-col gap-2'>
                    <p>
                        {`${modalLabel} Name`}
                    </p>
                    <input
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                        className='p-2 bg-transparent border rounded-md outline-none border-line'
                    />
                </div>

                {error && <p className='text-red-800'>{error.shape?.frontEndMessage}</p>}

                <div className='flex justify-end gap-4'>
                    <button
                        onClick={confirmClickHandler}
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

export default CreateItemModal;
