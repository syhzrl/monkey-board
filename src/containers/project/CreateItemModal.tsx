import React, { FunctionComponent, useContext, useRef, useEffect, useState } from 'react';

import { ItemCRUDContext } from 'contexts/ItemCRUD';

import { trpc } from 'utils/trpc';

import useDetectClickOutside from 'hooks/useDetectClickOutside';

import { Close } from 'assets/icons';

import Spinner from 'components/Spinner';

interface CreateItemModalProps {
    isOpen: boolean;
    closeModalHandler: (state: boolean) => void;
}

const CreateItemModal: FunctionComponent<CreateItemModalProps> = (props: CreateItemModalProps) => {
    const { isOpen, closeModalHandler } = props;

    const { selectedCRUDType, currentProjectDetailsId } = useContext(ItemCRUDContext);

    const [itemName, setItemName] = useState('');

    const [modalLabel, setModalLabel] = useState('');

    useEffect(() => {
        switch (selectedCRUDType) {
            case 'board': setModalLabel('Board'); break;
            case 'file': setModalLabel('File'); break;
            case 'drawing': setModalLabel('Drawing'); break;
            default: setModalLabel(''); break;
        }
    }, [selectedCRUDType]);

    useEffect(() => {
        if (!isOpen) {
            setItemName('');
        }
    }, [isOpen]);

    const utils = trpc.useContext();

    const { mutate: createBoard, isLoading: isCreateBoardLoading, error: createBoardError } = trpc.boards.createBoard.useMutation({
        onSuccess: () => {
            closeModalHandler(false);
            utils.project.getProjectDetails.invalidate();
        },
    });

    const { mutate: createFile, isLoading: isCreateFileLoading, error: createFileError } = trpc.files.createFile.useMutation({
        onSuccess: () => {
            closeModalHandler(false);
            utils.project.getProjectDetails.invalidate();
        },
    });

    const { mutate: createDrawing, isLoading: isCreateDrawingLoading, error: createDrawingError } = trpc.drawings.createDrawing.useMutation({
        onSuccess: () => {
            closeModalHandler(false);
            utils.project.getProjectDetails.invalidate();
        },
    });

    const ref = useRef<HTMLDivElement>(null);

    useDetectClickOutside(ref, closeModalHandler);

    const confirmClickHandler = () => {
        const dataToSubmit = {
            projectDetailsId: currentProjectDetailsId,
            name: itemName,
        };

        switch (selectedCRUDType) {
            case 'board': createBoard(dataToSubmit); break;
            case 'file': createFile(dataToSubmit); break;
            case 'drawing': createDrawing(dataToSubmit); break;
            default: break;
        }
    };

    const renderError = () => {
        let errorMsg = '';

        if (createBoardError) {
            errorMsg = createBoardError.shape?.frontEndMessage || '';
        }

        if (createFileError) {
            errorMsg = createFileError.shape?.frontEndMessage || '';
        }

        if (createDrawingError) {
            errorMsg = createDrawingError.shape?.frontEndMessage || '';
        }

        return (
            <p className='text-red-800'>
                {errorMsg}
            </p>
        );
    };

    const renderSpinnerOrButtonLabel = () => {
        if (isCreateBoardLoading || isCreateFileLoading || isCreateDrawingLoading) {
            return (
                <div className='w-[40px] h-[40px]'>
                    <Spinner />
                </div>
            );
        }

        return (
            <p>Create</p>
        );
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

                {renderError()}

                <div className='flex justify-end gap-4'>
                    <button
                        onClick={confirmClickHandler}
                        className='p-2 px-4 text-white transition-colors duration-150 rounded-md w-fit bg-button-grey hover:bg-button-grey-hover'
                    >
                        {renderSpinnerOrButtonLabel()}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateItemModal;
