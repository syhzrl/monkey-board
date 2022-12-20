import React, { FunctionComponent, useContext, useRef, useEffect, useState } from 'react';

import { ItemCRUDContext } from 'contexts/ItemCRUD';

import { trpc } from 'utils/trpc';

import useDetectClickOutside from 'hooks/useDetectClickOutside';

import { Close } from 'assets/icons';

import Spinner from 'components/Spinner';

interface EditItemModalProps {
    isOpen: boolean;
    closeModalHandler: (state: boolean) => void;
}

const EditItemModal: FunctionComponent<EditItemModalProps> = (props: EditItemModalProps) => {
    const { isOpen, closeModalHandler } = props;

    const { selectedCRUDType, selectedItem } = useContext(ItemCRUDContext);
    const { id, name } = selectedItem;

    const [itemName, setItemName] = useState(name);

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
        setItemName(name);
    }, [name]);

    const utils = trpc.useContext();

    const { mutate: editBoard, isLoading: isEditBoardLoading, error: editBoardError } = trpc.boards.editBoard.useMutation({
        onSuccess: () => {
            closeModalHandler(false);
            utils.project.getProjectDetails.invalidate();
        },
    });

    const { mutate: editFile, isLoading: isEditFileLoading, error: editFileError } = trpc.files.editFile.useMutation({
        onSuccess: () => {
            closeModalHandler(false);
            utils.project.getProjectDetails.invalidate();
        },
    });

    const { mutate: editDrawing, isLoading: isEditDrawingLoading, error: editDrawingError } = trpc.drawings.editDrawing.useMutation({
        onSuccess: () => {
            closeModalHandler(false);
            utils.project.getProjectDetails.invalidate();
        },
    });

    const ref = useRef<HTMLDivElement>(null);

    useDetectClickOutside(ref, closeModalHandler);

    const confirmClickHandler = () => {
        const dataToSubmit = {
            id,
            name: itemName,
        };

        switch (selectedCRUDType) {
            case 'board': editBoard(dataToSubmit); break;
            case 'file': editFile(dataToSubmit); break;
            case 'drawing': editDrawing(dataToSubmit); break;
            default: break;
        }
    };

    const renderError = () => {
        let errorMsg = '';

        if (editBoardError) {
            errorMsg = editBoardError.shape?.frontEndMessage || '';
        }

        if (editFileError) {
            errorMsg = editFileError.shape?.frontEndMessage || '';
        }

        if (editDrawingError) {
            errorMsg = editDrawingError.shape?.frontEndMessage || '';
        }

        return (
            <p className='text-red-800'>
                {errorMsg}
            </p>
        );
    };

    const renderSpinnerOrButtonLabel = () => {
        if (isEditBoardLoading || isEditFileLoading || isEditDrawingLoading) {
            return (
                <div className='w-[40px] h-[40px]'>
                    <Spinner />
                </div>
            );
        }

        return (
            <p>Confirm</p>
        );
    };

    if (!isOpen) return null;

    return (
        <div className='fixed top-0 left-0 flex items-center justify-center w-screen h-screen bg-black/[40%]'>
            <div ref={ref} className='p-4 rounded-md w-[40%] h-fit bg-primary-light flex flex-col gap-4 text-secondary-grey'>
                <div className='flex justify-between'>
                    <p>{`Edit ${name}`}</p>

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

export default EditItemModal;
